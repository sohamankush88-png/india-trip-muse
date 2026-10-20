import type { Trip } from '@/data/mockData';

export type LegMode = 'Cab' | 'Flight' | 'Train' | 'Taxi' | 'Bus' | 'Road' | 'Auto';
export type JourneyLeg = { from: string; to: string; mode: LegMode; time: string; duration: string; distance: string; cost: number; note: string };

/** Illustrative, mock-only legs for the selected outbound route. Costs are per person in INR. */
export function journeyLegs(trip: Trip, routeId: string): JourneyLeg[] {
  const kashmir = /Srinagar|Kashmir/i.test(trip.to);
  const city = trip.to.split(',')[0]?.trim() || trip.to;
  const from = trip.from;
  const leg = (from: string, to: string, mode: LegMode, time: string, duration: string, distance: string, cost: number, note: string): JourneyLeg => ({ from, to, mode, time, duration, distance, cost, note });

  if (kashmir) {
    if (routeId === 'train') return [
      leg(`${from} Junction`, 'Jammu Tawi', 'Train', '17:20', '35 hours', '2,050 km', 2100, 'No direct train to Srinagar — ride to Jammu Tawi first.'),
      leg('Jammu Tawi', city, 'Road', '05:00', '8 hours', '260 km', 1800, 'Shared or private cab via the Jammu–Srinagar highway.'),
      leg(city, 'Hotel', 'Auto', '13:00', '20 min', '6 km', 200, 'Short local ride to your stay.'),
    ];
    if (routeId === 'bus') return [
      leg(from, 'Delhi', 'Bus', '06:00', '28 hours', '1,450 km', 1800, 'Overnight sleeper coach.'),
      leg('Delhi', 'Jammu', 'Bus', '11:00', '12 hours', '590 km', 900, 'Connecting state or private coach.'),
      leg('Jammu', city, 'Bus', '23:30', '8 hours', '260 km', 700, 'Morning arrival in the valley, weather permitting.'),
      leg(`${city} Bus Stand`, 'Hotel', 'Auto', '07:40', '20 min', '5 km', 150, 'Short local ride to your stay.'),
    ];
    if (routeId === 'mixed') return [
      leg(from, 'Mumbai', 'Train', '04:00', '3h 30m', '150 km', 1200, 'Early express train to Mumbai.'),
      leg('Mumbai Airport', 'Delhi Airport', 'Flight', '09:30', '2h 10m', '1,150 km', 3000, 'First flight of your connection.'),
      leg('Delhi Airport', `${city} Airport`, 'Flight', '12:40', '1h 30m', '640 km', 3200, 'Connecting flight into the valley.'),
      leg(`${city} Airport`, 'Hotel', 'Taxi', '14:20', '35 min', '14 km', 800, 'Prepaid taxi from the airport.'),
    ];
    return [
      leg(from, 'Mumbai Airport', 'Cab', '05:30', '3 hours', '150 km', 1200, 'Expressway cab to the airport.'),
      leg('Mumbai Airport', `${city} Airport`, 'Flight', '09:30', '2h 40m', '1,900 km', 6200, 'Direct flight with Himalayan views.'),
      leg(`${city} Airport`, 'Hotel', 'Taxi', '12:15', '35 min', '14 km', 800, 'Prepaid taxi from the airport.'),
    ];
  }

  if (routeId === 'train') return [
    leg(`${from} Railway Station`, `${city} Railway Station`, 'Train', '17:20', '20 hours', 'Approx.', 1600, 'Sample overnight train — confirm current schedules.'),
    leg(`${city} Railway Station`, 'Hotel', 'Auto', '13:20', '25 min', '7 km', 250, 'Short local ride to your stay.'),
  ];
  if (routeId === 'bus') return [
    leg(`${from} Bus Stand`, `${city} Bus Stand`, 'Bus', '06:00', '18 hours', 'Approx.', 1400, 'Sample sleeper coach — confirm current operators.'),
    leg(`${city} Bus Stand`, 'Hotel', 'Auto', '00:10', '20 min', '5 km', 200, 'Short local ride to your stay.'),
  ];
  if (routeId === 'mixed') return [
    leg(from, 'Mumbai', 'Train', '04:00', '3h 30m', '150 km', 1200, 'Early express train to Mumbai.'),
    leg('Mumbai Airport', `${city} Airport`, 'Flight', '09:30', '2h 30m', 'Approx.', 5000, 'Sample connecting flight.'),
    leg(`${city} Airport`, 'Hotel', 'Taxi', '12:20', '40 min', 'Approx.', 700, 'Airport taxi to your stay.'),
  ];
  return [
    leg(from, `${from} Airport`, 'Cab', '05:30', '45 min', 'Approx.', 600, 'Cab to the nearest airport.'),
    leg(`${from} Airport`, `${city} Airport`, 'Flight', '08:00', '2h 15m', 'Approx.', 5800, 'Sample direct flight.'),
    leg(`${city} Airport`, 'Hotel', 'Taxi', '10:40', '40 min', 'Approx.', 700, 'Airport taxi to your stay.'),
  ];
}
