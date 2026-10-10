import { createFileRoute } from '@tanstack/react-router';
import { PlanPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/plan-trip')({
 head:()=>({meta:[{title:'Plan your Indian adventure | YatraGenie'},{name:'description',content:'Create a personalized Indian trip with sample transport, stays and daily itineraries.'},{property:'og:title',content:'Plan your Indian adventure | YatraGenie'},{property:'og:description',content:'Create a personalized Indian trip with sample transport, stays and daily itineraries.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:PlanPage,
});
