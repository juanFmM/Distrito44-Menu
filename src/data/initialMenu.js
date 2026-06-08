export const initialCategories = [
  {
    id: 'entradas',
    name: 'Entradas',
    icon: 'fa-solid fa-cheese',
    description: 'Bocados para compartir',
  },
  {
    id: 'papas',
    name: 'Papas',
    icon: 'fa-solid fa-bowl-food',
    description: 'Papas fritas con toppings especiales',
  },
  {
    id: 'sandwiches',
    name: 'Sándwiches',
    icon: 'fa-solid fa-bread-slice',
    description: 'Clásicos callejeros',
  },
  {
    id: 'smash-burgers',
    name: 'Smash Burgers',
    icon: 'fa-solid fa-burger',
    description: 'Smash burgers y combos',
  },
  {
    id: 'burgers',
    name: 'Burgers Premium',
    icon: 'fa-solid fa-fire',
    description: 'Hamburguesas premium 7 oz',
  },
  {
    id: 'postres',
    name: 'Postres',
    icon: 'fa-solid fa-ice-cream',
    description: 'Para cerrar con dulzura',
  },
];

export const initialItems = [
  // ENTRADAS
  {
    id: 'e1',
    categoryId: 'entradas',
    name: 'Chicken Nuggets',
    description: 'Crujientes bocados de pollo con salsa BBQ.',
    price: 400,
    badge: null,
  },
  {
    id: 'e2',
    categoryId: 'entradas',
    name: 'Gouditas',
    description: 'Triángulos crujientes de cheddar y jalapeño.',
    price: 400,
    badge: 'Picante',
  },
  {
    id: 'e3',
    categoryId: 'entradas',
    name: 'Nachitos Picantes',
    description: 'Bites rellenos de queso gouda cremoso.',
    price: 400,
    badge: 'Picante',
  },

  // PAPAS
  {
    id: 'p1',
    categoryId: 'papas',
    name: 'Philly Cheese Fries',
    description: 'Papas crujientes con quesos provolone y americano y carne Angus estilo Philly.',
    price: 680,
    badge: null,
  },
  {
    id: 'p2',
    categoryId: 'papas',
    name: 'Pulled Pork Fries',
    description: 'Papas fritas crujientes con queso cheddar, pulled pork y salsa BBQ.',
    price: 750,
    badge: 'Popular',
  },

  // SÁNDWICHES
  {
    id: 's1',
    categoryId: 'sandwiches',
    name: 'Philly Cheesesteak',
    description: 'Clásico Philly con tiras de carne Angus y cheese whiz casero, estilo 100% callejero.',
    price: 750,
    badge: 'Popular',
  },

  // SMASH BURGERS
  {
    id: 'sb1',
    categoryId: 'smash-burgers',
    name: 'UFO Burger',
    description: 'Carne 3.5 oz, doble queso americano y salsa de la casa. Agrega bacon por $75.',
    price: 575,
    badge: null,
  },
  {
    id: 'sb2',
    categoryId: 'smash-burgers',
    name: 'Smash Bacon',
    description: 'Doble smash de 3.5 oz, queso americano y tiras de bacon crujiente.',
    price: 485,
    badge: null,
  },
  {
    id: 'sb3',
    categoryId: 'smash-burgers',
    name: 'Chicken & Fries',
    description: 'Combo de Chicken Nuggets y papas fritas.',
    price: 450,
    badge: 'Combo',
  },
  {
    id: 'sb4',
    categoryId: 'smash-burgers',
    name: 'Smashburger Double',
    description: 'Doble carne de 3.5 oz, queso americano y salsa de la casa.',
    price: 550,
    badge: null,
  },
  {
    id: 'sb5',
    categoryId: 'smash-burgers',
    name: 'Oklahoma',
    description: 'Doble carne 14 oz de res premium con queso americano y bacon crujiente.',
    price: 815,
    badge: 'Especial',
  },
  {
    id: 'sb6',
    categoryId: 'smash-burgers',
    name: 'Double Bacon Cheese',
    description: 'Doble carne de 3.5 oz aplastada con cebolla, queso americano y salsa de la casa en pan brioche.',
    price: 650,
    badge: null,
  },

  // BURGERS PREMIUM
  {
    id: 'b1',
    categoryId: 'burgers',
    name: 'Bacon Blast',
    description: 'Carne 7 oz, mermelada de tocineta, queso americano y salsa de la casa.',
    price: 725,
    badge: null,
  },
  {
    id: 'b2',
    categoryId: 'burgers',
    name: 'Gaucho Burger',
    description: 'Carne 7 oz, mermelada de morrón, provoleta y chimichurri.',
    price: 770,
    badge: 'Clásica',
  },
  {
    id: 'b3',
    categoryId: 'burgers',
    name: 'BBQ Burger',
    description: 'Carne 7 oz, pulled pork y aros de cebolla en salsa BBQ.',
    price: 725,
    badge: 'Popular',
  },
  {
    id: 'b4',
    categoryId: 'burgers',
    name: 'Hilly Cheese',
    description: 'Carne 7 oz, morrón y cebolla salteada con mezcla de queso provolone y americano.',
    price: 770,
    badge: null,
  },
  {
    id: 'b5',
    categoryId: 'burgers',
    name: 'La Picante',
    description: 'Carne 7 oz, salsa picante, cebolla encurtida y queso americano.',
    price: 650,
    badge: 'Picante',
  },

  // POSTRES
  {
    id: 'po1',
    categoryId: 'postres',
    name: 'Postre',
    description: 'Base: fresa o banana · Salsa: nutella o dulce de leche · Topping: oreo o maní.',
    price: null,
    badge: 'Personalizable',
  },
];
