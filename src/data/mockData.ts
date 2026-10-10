import kashmir from '@/assets/kashmir-hero.jpg';
import goa from '@/assets/goa.jpg';
import manali from '@/assets/manali.jpg';
import jaipur from '@/assets/jaipur.jpg';
import hotelAsset from '@/assets/hotel.asset.json';
import foodAsset from '@/assets/food.asset.json';
import keralaAsset from '@/assets/kerala.asset.json';
import ladakhAsset from '@/assets/ladakh.asset.json';
import rishikeshAsset from '@/assets/rishikesh.asset.json';
export const images = { kashmir, goa, manali, jaipur, hotel: hotelAsset.url, food: foodAsset.url };
export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export type Trip = { from: string; to: string; departure: string; returnDate: string; days: number; travelers: number; budget: number; preference: string; interests: string[] };
export const defaultTrip: Trip = { from: 'Pune', to: 'Srinagar, Kashmir', departure: '2026-11-12', returnDate: '2026-11-16', days: 5, travelers: 1, budget: 30000, preference: 'Balanced', interests: ['Nature', 'Food'] };
export const destinations = [
 { name: 'Kashmir', city: 'Srinagar, Kashmir', image: kashmir, tag: 'A little piece of paradise', price: 18000, type: 'Mountains', days: '5–7 days' },
 { name: 'Goa', city: 'Goa', image: goa, tag: 'Sun, sand & good times', price: 8500, type: 'Beaches', days: '3–5 days' },
 { name: 'Manali', city: 'Manali', image: manali, tag: 'Find your mountain moment', price: 12000, type: 'Mountains', days: '4–6 days' },
 { name: 'Jaipur', city: 'Jaipur', image: jaipur, tag: 'A royal kind of getaway', price: 7500, type: 'Heritage', days: '3–4 days' },
 { name: 'Kerala', city: 'Kochi, Kerala', image: keralaAsset.url, tag: 'Slow days, beautiful backwaters', price: 14000, type: 'Nature', days: '5–7 days' },
 { name: 'Ladakh', city: 'Leh, Ladakh', image: ladakhAsset.url, tag: 'Adventure beyond the ordinary', price: 24000, type: 'Adventure', days: '6–8 days' },
 { name: 'Rishikesh', city: 'Rishikesh', image: rishikeshAsset.url, tag: 'A riverside state of mind', price: 9000, type: 'Adventure', days: '3–5 days' },
 { name: 'Shimla', city: 'Shimla', image: manali, tag: 'Pine trees & mountain air', price: 11000, type: 'Mountains', days: '3–5 days' },
];
export type Place = { id: string; name: string; category: string; image: string; rating: number; reviews: number; area: string; cost: number; description: string; distance: string; hours: string; lat: number; lng: number };
export const hotels: Place[] = [
 {id:'h1',name:'The Chinar Lakeside',category:'Hotels',image:images.hotel,rating:4.8,reviews:284,area:'Boulevard Road, Srinagar',cost:2400,description:'Wake up to lake views, warm Kashmiri hospitality and a fresh local breakfast.',distance:'1.2 km from Dal Lake · 35 min from airport',hours:'Check-in 2 PM · Check-out 11 AM',lat:34.105,lng:74.879},
 {id:'h2',name:'Houseboat Noor Mahal',category:'Hotels',image:kashmir,rating:4.7,reviews:192,area:'Dal Lake, Srinagar',cost:3800,description:'A traditional carved-wood houseboat with a peaceful private deck.',distance:'On Dal Lake · 40 min from airport',hours:'Check-in 1 PM · Check-out 11 AM',lat:34.116,lng:74.889},
 {id:'h3',name:'Valley View Guesthouse',category:'Hotels',image:manali,rating:4.4,reviews:116,area:'Raj Bagh, Srinagar',cost:900,description:'A cosy, affordable base with Wi-Fi, parking and friendly hosts.',distance:'4 km from Dal Lake · 25 min from airport',hours:'Check-in 12 PM · Check-out 10 AM',lat:34.063,lng:74.838},
 {id:'h4',name:'The Grand Kashmir',category:'Hotels',image:images.hotel,rating:4.9,reviews:418,area:'Nishat, Srinagar',cost:6500,description:'A premium retreat with garden terraces, room service and mountain views.',distance:'2 km from Nishat Bagh · 45 min from airport',hours:'Check-in 3 PM · Check-out 12 PM',lat:34.128,lng:74.883},
];
export const attractions: Place[] = [
 {id:'a1',name:'Dal Lake & Shikara Ride',category:'Attractions',image:kashmir,rating:4.9,reviews:1240,area:'Dal Lake, Srinagar',cost:600,description:'Glide past floating gardens and wooden houseboats on Kashmir’s most iconic lake.',distance:'1.2 km · 8 min by auto',hours:'6 AM – 7 PM',lat:34.117,lng:74.887},
 {id:'a2',name:'Gulmarg Gondola',category:'Attractions',image:manali,rating:4.8,reviews:980,area:'Gulmarg, Kashmir',cost:950,description:'Ride above pine forests to spectacular Himalayan panoramas. Reserve tickets ahead.',distance:'52 km · 90 min by taxi',hours:'10 AM – 4 PM',lat:34.048,lng:74.381},
 {id:'a3',name:'Betaab Valley',category:'Attractions',image:manali,rating:4.7,reviews:620,area:'Pahalgam, Kashmir',cost:100,description:'Meadows, snow-tipped mountains and riverside walks in a picture-perfect valley.',distance:'95 km · 2.5 hours by taxi',hours:'8 AM – 6 PM',lat:34.034,lng:75.328},
 {id:'a4',name:'Nishat Mughal Gardens',category:'Attractions',image:keralaAsset.url,rating:4.6,reviews:440,area:'Nishat, Srinagar',cost:30,description:'Terraced gardens, fountains and a beautiful view over Dal Lake.',distance:'8 km · 25 min by taxi',hours:'9 AM – 7 PM',lat:34.123,lng:74.88},
 {id:'a5',name:'Shankaracharya Temple',category:'Attractions',image:jaipur,rating:4.8,reviews:720,area:'Zabarwan Hills, Srinagar',cost:0,description:'A peaceful hilltop temple with sweeping views of Srinagar.',distance:'7 km · 30 min by taxi',hours:'7 AM – 5 PM',lat:34.081,lng:74.863},
];
export const foods: Place[] = ['Rogan Josh','Kashmiri Pulao','Kahwa','Wazwan','Sheermal','Misal Pav','Puran Poli','Vada Pav','Sabudana Khichdi'].map((name,i)=>({id:`f${i}`,name,category:'Food',image:images.food,rating:4.5+(i%3)/10,reviews:80+i*21,area:i<5?'Ahdoos, Residency Road, Srinagar':'Local favourites, Pune',cost:[450,220,80,850,60,100,80,30,90][i],description:['Slow-cooked aromatic lamb with traditional Kashmiri spices.','Fragrant saffron rice with nuts and seasonal fruit.','Warming green tea infused with saffron, almonds and cardamom.','A celebratory multi-course Kashmiri feast.','Soft saffron flatbread, perfect with a cup of Kahwa.'][i] || 'A much-loved Maharashtrian favourite, freshly made by local kitchens.',distance:'2 km · 10 min by auto',hours:'9 AM – 10 PM',lat:34.067+i*.003,lng:74.833+i*.002}));
export const hubs: Place[] = [{id:'t1',name:'Srinagar Airport',category:'Transport',image:kashmir,rating:4.2,reviews:850,area:'Sheikh ul-Alam International Airport',cost:800,description:'Prepaid taxis connect the airport to the city and Dal Lake.',distance:'14 km · 35 min by taxi',hours:'Flight schedule dependent',lat:33.987,lng:74.774},{id:'t2',name:'Jammu Tawi Railway Station',category:'Transport',image:manali,rating:4.1,reviews:620,area:'Jammu',cost:1800,description:'Road transfers to Srinagar take around 7–9 hours, weather permitting.',distance:'260 km · 7–9 hours by road',hours:'Open 24 hours',lat:32.705,lng:74.88}];
export const locations = ['Pune','Mumbai','Srinagar, Kashmir','Goa','Manali','Jaipur','Kochi, Kerala','Leh, Ladakh','Rishikesh','Shimla','Delhi','Bengaluru'];
export const transports = [
 {id:'flight',name:'Flight + airport transfers',mode:'Flight',duration:'7h 15m',departure:'05:30',arrival:'12:45',cost:8200,transfers:2,route:['Pune','Mumbai Airport','Srinagar Airport','Hotel'],pros:'Fastest journey · comfortable',cons:'Higher fare · airport wait',label:'Recommended'},
 {id:'train',name:'Train + road transfer',mode:'Train',duration:'43h 30m',departure:'17:20',arrival:'12:50 +2 days',cost:3900,transfers:1,route:['Pune Junction','Jammu Tawi','Srinagar','Hotel'],pros:'Best value · scenic road transfer',cons:'Long journey · weather-dependent road',label:'Budget pick'},
 {id:'bus',name:'Bus + connecting coach',mode:'Bus',duration:'48h 10m',departure:'06:00',arrival:'06:10 +2 days',cost:3400,transfers:2,route:['Pune','Delhi','Jammu','Srinagar'],pros:'Lowest fare · flexible departures',cons:'Lengthy journey · limited comfort',label:'Cheapest'},
 {id:'mixed',name:'Train + connecting flight',mode:'Mixed',duration:'10h 20m',departure:'04:00',arrival:'14:20',cost:6800,transfers:2,route:['Pune','Mumbai','Delhi Airport','Srinagar'],pros:'Balanced fare · more flight options',cons:'Two connections · longer wait',label:'Balanced'},
];
export const itineraryNames = ['Hello, Kashmir','A day above the clouds','Valleys & riverside moments','Gardens, heritage & local finds','One last cup of Kahwa'];
