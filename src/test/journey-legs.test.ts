import { describe, expect, it } from 'vitest';
import { defaultTrip } from '../data/mockData';
import { journeyLegs } from '../components/travel/journeyLegs';

const routes = ['flight', 'train', 'bus', 'mixed'];

describe('journey preview legs', () => {
  it.each(routes)('%s route legs connect stop to stop and end at the hotel', routeId => {
    const legs = journeyLegs(defaultTrip, routeId);
    expect(legs.length).toBeGreaterThan(1);
    expect(legs.at(-1)?.to).toBe('Hotel');
    legs.slice(1).forEach((leg, i) => {
      const prev = legs[i]!.to.replace(' Airport', '');
      expect(leg.from.replace(' Airport', '').replace(' Bus Stand', '')).toBe(prev.replace(' Bus Stand', ''));
    });
  });
  it('train to Kashmir goes via Jammu Tawi because there is no direct train', () => {
    const legs = journeyLegs(defaultTrip, 'train');
    expect(legs[0]).toMatchObject({ from: 'Pune Junction', to: 'Jammu Tawi', mode: 'Train' });
    expect(legs[1]).toMatchObject({ from: 'Jammu Tawi', to: 'Srinagar', mode: 'Road' });
  });
  it('flight route legs match the step-by-step journey costs', () => {
    expect(journeyLegs(defaultTrip, 'flight').map(l => l.cost)).toEqual([1200, 6200, 800]);
  });
  it('uses the chosen destination for other trips', () => {
    const legs = journeyLegs({ ...defaultTrip, to: 'Goa' }, 'flight');
    expect(legs[1]?.to).toBe('Goa Airport');
  });
});
