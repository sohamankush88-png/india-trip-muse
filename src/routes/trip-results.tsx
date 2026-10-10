import { createFileRoute } from '@tanstack/react-router';
import { ResultsPage } from '@/components/travel/Pages';
export const Route = createFileRoute('/trip-results')({
 head:()=>({meta:[{title:'Your connected travel plan | YatraGenie'},{name:'description',content:'Compare sample flights, trains, buses and multi-leg Indian travel journeys.'},{property:'og:title',content:'Your connected travel plan | YatraGenie'},{property:'og:description',content:'Compare sample flights, trains, buses and multi-leg Indian travel journeys.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:ResultsPage,
});
