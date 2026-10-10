import { createFileRoute } from '@tanstack/react-router';
import { ItineraryPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/itinerary')({
 head:()=>({meta:[{title:'Your day-by-day itinerary | YatraGenie'},{name:'description',content:'Explore daily activities, travel times, food and share your Indian trip itinerary.'},{property:'og:title',content:'Your day-by-day itinerary | YatraGenie'},{property:'og:description',content:'Explore daily activities, travel times, food and share your Indian trip itinerary.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:ItineraryPage,
});
