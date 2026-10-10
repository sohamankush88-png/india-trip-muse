import { createFileRoute } from '@tanstack/react-router';
import { MapPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/map')({
 head:()=>({meta:[{title:'Explore your trip map | YatraGenie'},{name:'description',content:'Discover sample Srinagar hotels, attractions, food and transport hubs.'},{property:'og:title',content:'Explore your trip map | YatraGenie'},{property:'og:description',content:'Discover sample Srinagar hotels, attractions, food and transport hubs.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:MapPage,
});
