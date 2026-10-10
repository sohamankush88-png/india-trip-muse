import { createFileRoute } from '@tanstack/react-router';
import { ExplorePage } from '@/components/travel/Pages';
export const Route = createFileRoute('/explore')({
 head:()=>({meta:[{title:'Discover India | YatraGenie'},{name:'description',content:'Explore destinations, regional dishes, travel tips and local experiences.'},{property:'og:title',content:'Discover India | YatraGenie'},{property:'og:description',content:'Explore destinations, regional dishes, travel tips and local experiences.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:ExplorePage,
});
