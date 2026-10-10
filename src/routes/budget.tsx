import { createFileRoute } from '@tanstack/react-router';
import { BudgetPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/budget')({
 head:()=>({meta:[{title:'Plan and track your travel budget | YatraGenie'},{name:'description',content:'Compare itinerary estimates with actual expenses and optimize your trip budget.'},{property:'og:title',content:'Plan and track your travel budget | YatraGenie'},{property:'og:description',content:'Compare itinerary estimates with actual expenses and optimize your trip budget.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:BudgetPage,
});
