import { createFileRoute } from '@tanstack/react-router';
import { MyTripsPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/my-trips')({
 head:()=>({meta:[{title:'Your travel stories | YatraGenie'},{name:'description',content:'View your saved session plans and sample Indian getaways.'},{property:'og:title',content:'Your travel stories | YatraGenie'},{property:'og:description',content:'View your saved session plans and sample Indian getaways.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:MyTripsPage,
});
