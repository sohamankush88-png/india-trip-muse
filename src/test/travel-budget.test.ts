import {describe,it,expect} from 'vitest';
import {getBudget,getTransportOptions} from '@/services/travelService';
import {defaultTrip} from '@/data/mockData';
describe('Mock trip calculations',()=>{
 it('computes round-trip transport and room nights',()=>{const result=getBudget(defaultTrip,'flight','h1');expect(result.find(c=>c.name==='Transport')?.cost).toBe(16400);expect(result.find(c=>c.name==='Hotels')?.cost).toBe(9600);expect(result.reduce((s,c)=>s+c.cost,0)).toBe(37550);});
 it('budget alternatives lower the total',()=>{const total=(r:string,h:string)=>getBudget(defaultTrip,r,h).reduce((s,c)=>s+c.cost,0);expect(total('train','h3')).toBeLessThan(total('flight','h1'));});
 it('adapts origin and destination labels',async()=>{const rows=await getTransportOptions({...defaultTrip,from:'Delhi',to:'Goa'});expect(rows[0]?.route[0]).toBe('Delhi');expect(rows[0]?.route).toContain('Goa');});
});
