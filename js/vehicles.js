/* =============================================================
   BAKI AUTOMOTORES — Base de datos de vehículos (ficticia)
   15 autos + 5 motos · Modelos comercializados en Argentina.
   Toda la información es ficticia pero coherente con el mercado local.
   Imágenes ilustrativas (Unsplash), libres de uso — NO son fotos
   oficiales ni pertenecen a la concesionaria.
   ============================================================= */

/* Helper: arma la URL de una imagen ilustrativa de Unsplash */
const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Pools de imágenes ilustrativas reutilizables */
const IMG_AUTO = [
  U('1503376780353-7e6692767b70'), // 0
  U('1552519507-da3b142c6e3d'),     // 1
  U('1494976388531-d1058494cdd8'),  // 2
  U('1568605117036-5fe5e7bab0b7'),  // 3
  U('1541899481282-d53bffe3c35d'),  // 4
  U('1583121274602-3e2820c69888'),  // 5
  U('1605559424843-9e4c228bf1c2'),  // 6
  U('1502877338535-766e1452684a'),  // 7
  U('1550355291-bbee04a92027'),     // 8
  U('1542282088-fe8426682b8f'),     // 9  (interior)
  U('1493238792000-8113da705763'),  // 10
  U('1519641471654-76ce0107ad1b'),  // 11
];
const IMG_MOTO = [
  U('1558981806-ec527fa84c39'),
  U('1568772585407-9361f9bf3a87'),
  U('1449426468159-d96dbf08f19f'),
  U('1591637333184-19aa84b3e01f'),
  U('1517954259714-6d3aa6d09a34'),
];

/* Arma una galería de 3 fotos rotando el pool */
const gal = (pool, i) => [pool[i % pool.length], pool[(i + 3) % pool.length], pool[9 % pool.length]];

/* Fotos locales optimizadas de un vehículo (assets/vehiculos/slug-1.webp ...) */
const fotos = (slug, n = 5) =>
  Array.from({ length: n }, (_, i) => `assets/vehiculos/${slug}-${i + 1}.webp`);

/* =============================================================
   Listado de vehículos
   ============================================================= */
const VEHICULOS = [
  /* ---------------------------- AUTOS ---------------------------- */
  {
    id: 1, tipo: 'auto', marca: 'Toyota', modelo: 'Corolla', version: 'XEI 2.0 CVT',
    anio: 2021, precio: 27500000, km: 45000, combustible: 'Nafta',
    motor: '2.0 16V Dual VVT-i', potencia: '170 cv', caja: 'Automática CVT',
    traccion: 'Delantera', color: 'Gris Plata', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AF 123 KL', duenos: 1, estado: 'Excelente',
    servicios: 'Todos los services realizados en concesionario oficial. Último a los 40.000 km.',
    neumaticos: 'Bridgestone Turanza — 70% de vida útil',
    interior: 'Tapizado de cuero ecológico, impecable, sin roturas ni manchas.',
    exterior: 'Pintura original, sin detalles de granizo ni golpes.',
    observaciones: 'Unidad de único dueño, no fumador. Service al día y lista para transferir.',
    equipamiento: ['Pantalla táctil 8"', 'Apple CarPlay / Android Auto', 'Cámara de retroceso', 'Llave inteligente', 'Sensores de estacionamiento', 'Climatizador automático'],
    seguridad: ['7 airbags', 'ABS + EBD', 'Control de estabilidad', 'Control de tracción', 'Toyota Safety Sense', 'Anclajes ISOFIX'],
    confort: ['Butacas parcialmente eléctricas', 'Tapizado de cuero', 'Volante multifunción', 'Encendido por botón', 'Espejos rebatibles eléctricos'],
    img: 'assets/vehiculos/corolla-card.webp', galeria: fotos('corolla'),
  },
  {
    id: 2, tipo: 'auto', marca: 'Toyota', modelo: 'Hilux', version: 'SRV 2.8 TDI 4x4 AT',
    anio: 2020, precio: 54900000, km: 89000, combustible: 'Diésel',
    motor: '2.8 Turbo Diésel', potencia: '204 cv', caja: 'Automática 6 vel.',
    traccion: '4x4', color: 'Blanco Perlado', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AE 456 MN', duenos: 2, estado: 'Muy bueno',
    servicios: 'Service oficial completo. Correa/cadena y filtros al día.',
    neumaticos: 'Goodyear Wrangler — 60% de vida útil',
    interior: 'Tapizado de cuero, leve desgaste de uso normal en asiento del conductor.',
    exterior: 'Cobertor de caja marítimo y barra antivuelco. Sin óxido.',
    observaciones: 'Pick-up de trabajo y familia, siempre en concesionario. Enganche instalado.',
    equipamiento: ['Pantalla multimedia', 'Cámara de retroceso', 'Control crucero', 'Faros LED', 'Llantas 18"', 'Tomas 12V en caja'],
    seguridad: ['7 airbags', 'ABS + EBD', 'Control de descenso', 'Asistente de arranque en pendiente', 'Control de estabilidad', 'Diferencial trasero autoblocante'],
    confort: ['Climatizador automático bizona', 'Butaca del conductor eléctrica', 'Tapizado de cuero', 'Volante con levas', 'Llave inteligente'],
    img: 'assets/vehiculos/hilux-card.webp', galeria: fotos('hilux'),
  },
  {
    id: 3, tipo: 'auto', marca: 'Volkswagen', modelo: 'Amarok', version: 'Highline 3.0 V6 4x4 AT',
    anio: 2019, precio: 52000000, km: 112000, combustible: 'Diésel',
    motor: '3.0 V6 TDI', potencia: '258 cv', caja: 'Automática 8 vel. Tiptronic',
    traccion: '4x4 permanente', color: 'Gris Indio', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AD 789 PQ', duenos: 2, estado: 'Muy bueno',
    servicios: 'Servicios al día en taller especializado VW. Distribución revisada.',
    neumaticos: 'Pirelli Scorpion — 55% de vida útil',
    interior: 'Tapizado de cuero Nappa en excelente estado.',
    exterior: 'Estribos laterales, roll bar y lona marítima. Pintura conservada.',
    observaciones: 'La pick-up más potente de su segmento. Excelente para ruta y trabajo.',
    equipamiento: ['App-Connect', 'Cámara de retroceso', 'Sensores 360°', 'Faros bi-xenón', 'Llantas 19"', 'Techo con barras'],
    seguridad: ['Airbags frontales y laterales', 'ABS off-road', 'Control de estabilidad', 'Asistente de descenso', 'Cámara multivista'],
    confort: ['Climatizador bizona', 'Butacas eléctricas con memoria', 'Volante con levas', 'Encendido por botón', 'Cargador y tomas USB'],
    img: 'assets/vehiculos/amarok-card.webp', galeria: fotos('amarok'),
  },
  {
    id: 4, tipo: 'auto', marca: 'Volkswagen', modelo: 'Golf', version: 'GTI 2.0 TSI DSG',
    anio: 2018, precio: 34000000, km: 68000, combustible: 'Nafta',
    motor: '2.0 TSI Turbo', potencia: '220 cv', caja: 'Automática DSG 6 vel.',
    traccion: 'Delantera', color: 'Rojo Tornado', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AC 321 RS', duenos: 1, estado: 'Excelente',
    servicios: 'Mantenimiento riguroso, aceite premium cada 10.000 km.',
    neumaticos: 'Continental SportContact — 65% de vida útil',
    interior: 'Tapizado deportivo tartán GTI original, impecable.',
    exterior: 'Detalles rojos GTI, llantas originales sin roces.',
    observaciones: 'Un ícono deportivo, de único dueño y muy cuidado. Motor a punto.',
    equipamiento: ['Digital Cockpit', 'Pantalla táctil', 'App-Connect', 'Faros full LED', 'Llantas 18" GTI', 'Escape deportivo'],
    seguridad: ['6 airbags', 'ABS + ESP', 'Control de tracción', 'Asistente de frenado', 'Anclajes ISOFIX'],
    confort: ['Climatizador Climatronic', 'Butacas deportivas', 'Volante multifunción en cuero', 'Sensor de lluvia', 'Encendido por botón'],
    img: 'assets/vehiculos/golf-card.webp', galeria: fotos('golf'),
  },
  {
    id: 5, tipo: 'auto', marca: 'Volkswagen', modelo: 'Polo', version: 'Highline 1.6 MSI AT',
    anio: 2021, precio: 22500000, km: 39000, combustible: 'Nafta',
    motor: '1.6 MSI', potencia: '110 cv', caja: 'Automática Tiptronic 6 vel.',
    traccion: 'Delantera', color: 'Blanco Cristal', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AF 654 TU', duenos: 1, estado: 'Excelente',
    servicios: 'Service oficial al día. Bajo kilometraje.',
    neumaticos: 'Firestone — 80% de vida útil',
    interior: 'Interior como nuevo, sin uso aparente.',
    exterior: 'Pintura impecable, sin detalles.',
    observaciones: 'Ideal primer auto o uso urbano. Muy económico y confiable.',
    equipamiento: ['Pantalla táctil 6.5"', 'App-Connect', 'Cámara de retroceso', 'Sensores traseros', 'Llantas de aleación', 'Control crucero'],
    seguridad: ['4 airbags', 'ABS + EBD', 'Control de estabilidad', 'Asistente de arranque en pendiente', 'ISOFIX'],
    confort: ['Aire acondicionado', 'Volante multifunción', 'Levantavidrios eléctricos', 'Espejos eléctricos', 'Bluetooth'],
    img: IMG_AUTO[7], galeria: gal(IMG_AUTO, 7),
  },
  {
    id: 6, tipo: 'auto', marca: 'Ford', modelo: 'Ranger', version: 'Limited 3.2 TDCi 4x4 AT',
    anio: 2020, precio: 49000000, km: 95000, combustible: 'Diésel',
    motor: '3.2 TDCi 5 cil.', potencia: '200 cv', caja: 'Automática 6 vel.',
    traccion: '4x4', color: 'Azul Aurora', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AE 987 VW', duenos: 2, estado: 'Muy bueno',
    servicios: 'Servicios Ford al día. Cambio de embrague no requerido (automática).',
    neumaticos: 'BF Goodrich — 50% de vida útil',
    interior: 'Cuero en buen estado, alfombras de goma a medida.',
    exterior: 'Lona marítima y estribos. Un detalle mínimo en paragolpes trasero.',
    observaciones: 'Full full, tope de gama. Excelente para quien busca confort y 4x4.',
    equipamiento: ['SYNC 3 con pantalla 8"', 'Cámara de retroceso', 'Sensores delanteros y traseros', 'Faros HID', 'Llantas 18"', 'Techo corredizo'],
    seguridad: ['6 airbags', 'ABS', 'Control de estabilidad', 'Control de descenso', 'Cámara de retroceso', 'Alerta de cambio de carril'],
    confort: ['Climatizador bizona', 'Butacas de cuero calefaccionadas', 'Butaca eléctrica', 'Volante en cuero', 'Llave inteligente'],
    img: IMG_AUTO[8], galeria: gal(IMG_AUTO, 8),
  },
  {
    id: 7, tipo: 'auto', marca: 'Ford', modelo: 'Focus', version: 'Titanium 2.0 AT',
    anio: 2017, precio: 19500000, km: 82000, combustible: 'Nafta',
    motor: '2.0 Duratec', potencia: '170 cv', caja: 'Automática PowerShift 6 vel.',
    traccion: 'Delantera', color: 'Gris Mercurio', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AA 246 XY', duenos: 2, estado: 'Bueno',
    servicios: 'Embrague de la caja PowerShift reemplazado recientemente. Service al día.',
    neumaticos: 'Pirelli Cinturato — 45% de vida útil',
    interior: 'Interior cuidado, cuero con leve desgaste de uso.',
    exterior: 'Pintura buena, con detalles menores propios del uso.',
    observaciones: 'Muy completo y confortable. Ideal familia por su espacio y equipamiento.',
    equipamiento: ['SYNC con pantalla', 'Cámara de retroceso', 'Sensor de estacionamiento', 'Estacionamiento automático', 'Faros bi-xenón', 'Llantas 17"'],
    seguridad: ['7 airbags', 'ABS + EBD', 'Control de estabilidad', 'Control de tracción', 'ISOFIX'],
    confort: ['Climatizador automático', 'Butacas de cuero', 'Volante multifunción', 'Encendido por botón', 'Sensor de lluvia y luz'],
    img: IMG_AUTO[11], galeria: gal(IMG_AUTO, 11),
  },
  {
    id: 8, tipo: 'auto', marca: 'Chevrolet', modelo: 'Cruze', version: 'LTZ 1.4 Turbo AT',
    anio: 2019, precio: 24000000, km: 57000, combustible: 'Nafta',
    motor: '1.4 Turbo', potencia: '153 cv', caja: 'Automática 6 vel.',
    traccion: 'Delantera', color: 'Negro Ónix', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AC 135 ZA', duenos: 1, estado: 'Excelente',
    servicios: 'Servicios Chevrolet al día. Único dueño con historial completo.',
    neumaticos: 'Goodyear EfficientGrip — 65% de vida útil',
    interior: 'Impecable, con Wi-Fi nativo y cargador inalámbrico.',
    exterior: 'Pintura negra bien conservada, sin rayones.',
    observaciones: 'Muy equipado y con motor turbo eficiente. Excelente andar en ruta.',
    equipamiento: ['MyLink pantalla 8"', 'Wi-Fi nativo', 'Cargador inalámbrico', 'Cámara de retroceso', 'Sensores de estacionamiento', 'Llantas 16"'],
    seguridad: ['6 airbags', 'ABS + EBD', 'Control de estabilidad', 'Control de tracción', 'Alerta de colisión', 'ISOFIX'],
    confort: ['Climatizador automático', 'Butacas de cuero', 'Volante multifunción', 'Encendido por botón', 'Espejos eléctricos rebatibles'],
    img: IMG_AUTO[1], galeria: gal(IMG_AUTO, 1),
  },
  {
    id: 9, tipo: 'auto', marca: 'Chevrolet', modelo: 'Tracker', version: 'Premier 1.2 Turbo AT',
    anio: 2022, precio: 31000000, km: 31000, combustible: 'Nafta',
    motor: '1.2 Turbo', potencia: '133 cv', caja: 'Automática 6 vel.',
    traccion: 'Delantera', color: 'Blanco Summit', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AF 802 BC', duenos: 1, estado: 'Excelente',
    servicios: 'Prácticamente nueva. Primer service realizado en tiempo y forma.',
    neumaticos: 'Continental — 85% de vida útil',
    interior: 'Interior a estrenar, sin detalles.',
    exterior: 'Impecable, con techo panorámico.',
    observaciones: 'SUV moderna, con muy bajo kilometraje y aún con garantía de fábrica vigente.',
    equipamiento: ['Pantalla 8" MyLink+', 'Wi-Fi nativo', 'Cámara de retroceso', 'Techo panorámico', 'Faros LED', 'Llantas 17"'],
    seguridad: ['6 airbags', 'ABS + EBD', 'Control de estabilidad', 'Alerta de punto ciego', 'Cámara de retroceso', 'ISOFIX'],
    confort: ['Climatizador automático', 'Butacas de cuero', 'Encendido por botón', 'Volante multifunción', 'Sensor de lluvia'],
    img: IMG_AUTO[5], galeria: gal(IMG_AUTO, 5),
  },
  {
    id: 10, tipo: 'auto', marca: 'Renault', modelo: 'Sandero', version: 'Stepway Intens 1.6',
    anio: 2020, precio: 17500000, km: 48000, combustible: 'Nafta',
    motor: '1.6 16V', potencia: '115 cv', caja: 'Manual 5 vel.',
    traccion: 'Delantera', color: 'Naranja Vulcano', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AE 470 DE', duenos: 1, estado: 'Muy bueno',
    servicios: 'Service al día. Correa de distribución sin necesidad de cambio.',
    neumaticos: 'Firestone — 60% de vida útil',
    interior: 'Interior en muy buen estado, sin roturas.',
    exterior: 'Pintura conservada, barras de techo originales.',
    observaciones: 'Práctico, económico y con la postura elevada de un crossover. Muy confiable.',
    equipamiento: ['Media Nav pantalla 7"', 'Navegador GPS', 'Cámara de retroceso', 'Barras de techo', 'Llantas de aleación', 'Bluetooth'],
    seguridad: ['4 airbags', 'ABS', 'Control de estabilidad', 'Asistente de arranque en pendiente', 'ISOFIX'],
    confort: ['Aire acondicionado', 'Volante multifunción', 'Levantavidrios eléctricos', 'Computadora de a bordo', 'Espejos eléctricos'],
    img: IMG_AUTO[2], galeria: gal(IMG_AUTO, 2),
  },
  {
    id: 11, tipo: 'auto', marca: 'Renault', modelo: 'Duster', version: 'Iconic 1.3 Turbo CVT',
    anio: 2021, precio: 26000000, km: 42000, combustible: 'Nafta',
    motor: '1.3 TCe Turbo', potencia: '154 cv', caja: 'Automática CVT',
    traccion: 'Delantera', color: 'Gris Estrella', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AF 015 FG', duenos: 1, estado: 'Excelente',
    servicios: 'Servicios oficiales al día. Motor turbo de nueva generación.',
    neumaticos: 'Continental — 70% de vida útil',
    interior: 'Interior premium con detalles cobre, impecable.',
    exterior: 'Pintura como nueva, sin detalles.',
    observaciones: 'La versión tope de gama del Duster. Robusta, cómoda y con bajo consumo.',
    equipamiento: ['Pantalla 8"', 'Apple CarPlay / Android Auto', 'Cámara multivista 360°', 'Faros LED', 'Llantas 17"', 'Tarjeta manos libres'],
    seguridad: ['4 airbags', 'ABS + EBD', 'Control de estabilidad', 'Alerta de punto ciego', 'Cámara 360°', 'ISOFIX'],
    confort: ['Climatizador automático', 'Butacas de cuero', 'Encendido por botón', 'Volante multifunción', 'Freno de mano eléctrico'],
    img: IMG_AUTO[6], galeria: gal(IMG_AUTO, 6),
  },
  {
    id: 12, tipo: 'auto', marca: 'Peugeot', modelo: '208', version: 'Feline 1.6 Tiptronic',
    anio: 2019, precio: 18000000, km: 61000, combustible: 'Nafta',
    motor: '1.6 16V', potencia: '115 cv', caja: 'Automática Tiptronic 6 vel.',
    traccion: 'Delantera', color: 'Gris Aluminio', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AC 640 HI', duenos: 2, estado: 'Muy bueno',
    servicios: 'Service al día en taller de confianza. Sin fallas.',
    neumaticos: 'Michelin — 55% de vida útil',
    interior: 'i-Cockpit en muy buen estado, tapizados cuidados.',
    exterior: 'Pintura buena con detalles mínimos de uso.',
    observaciones: 'Diseño europeo, ágil en ciudad y muy cómodo. Caja automática suave.',
    equipamiento: ['Pantalla táctil 7"', 'i-Cockpit', 'Cámara de retroceso', 'Sensores traseros', 'Faros con firma LED', 'Llantas de aleación'],
    seguridad: ['6 airbags', 'ABS + REF', 'Control de estabilidad', 'Control de tracción', 'ISOFIX'],
    confort: ['Climatizador automático', 'Volante compacto multifunción', 'Encendido por botón', 'Levantavidrios eléctricos', 'Espejos eléctricos'],
    img: IMG_AUTO[9], galeria: gal(IMG_AUTO, 9),
  },
  {
    id: 13, tipo: 'auto', marca: 'Peugeot', modelo: '308', version: 'Allure 1.6 THP AT',
    anio: 2018, precio: 19000000, km: 73000, combustible: 'Nafta',
    motor: '1.6 THP Turbo', potencia: '163 cv', caja: 'Automática 6 vel.',
    traccion: 'Delantera', color: 'Gris Grafito', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AB 908 JK', duenos: 2, estado: 'Bueno',
    servicios: 'Turbo y distribución revisados. Servicios al día.',
    neumaticos: 'Bridgestone — 50% de vida útil',
    interior: 'Interior amplio y cómodo, buen estado general.',
    exterior: 'Pintura conservada con detalles menores de uso.',
    observaciones: 'Hatchback premium con motor turbo. Muy buen andar y equipamiento.',
    equipamiento: ['Pantalla táctil', 'i-Cockpit', 'Cámara de retroceso', 'Sensores de estacionamiento', 'Faros full LED', 'Llantas 17"'],
    seguridad: ['6 airbags', 'ABS + EBD', 'Control de estabilidad', 'Control de tracción', 'ISOFIX'],
    confort: ['Climatizador bizona', 'Butacas con regulación lumbar', 'Techo panorámico', 'Volante multifunción', 'Sensor de lluvia'],
    img: IMG_AUTO[0], galeria: gal(IMG_AUTO, 8),
  },
  {
    id: 14, tipo: 'auto', marca: 'Fiat', modelo: 'Cronos', version: 'Precision 1.3 GSE CVT',
    anio: 2022, precio: 18500000, km: 28000, combustible: 'Nafta',
    motor: '1.3 GSE Firefly', potencia: '99 cv', caja: 'Automática CVT',
    traccion: 'Delantera', color: 'Blanco Banchisa', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AF 517 LM', duenos: 1, estado: 'Excelente',
    servicios: 'Casi nuevo. Primer service oficial realizado.',
    neumaticos: 'Goodyear — 85% de vida útil',
    interior: 'Interior a estrenar, sin detalles.',
    exterior: 'Impecable, único dueño.',
    observaciones: 'Sedán espacioso, económico y con caja automática. Muy bajo kilometraje.',
    equipamiento: ['Pantalla táctil 7"', 'Apple CarPlay / Android Auto', 'Cámara de retroceso', 'Sensores traseros', 'Llantas de aleación', 'Control crucero'],
    seguridad: ['4 airbags', 'ABS + EBD', 'Control de estabilidad', 'Asistente de arranque en pendiente', 'ISOFIX'],
    confort: ['Aire acondicionado', 'Volante multifunción de cuero', 'Levantavidrios eléctricos', 'Espejos eléctricos', 'Bluetooth'],
    img: IMG_AUTO[3], galeria: gal(IMG_AUTO, 5),
  },
  {
    id: 15, tipo: 'auto', marca: 'Honda', modelo: 'Civic', version: 'EXL 2.0 CVT',
    anio: 2019, precio: 29000000, km: 54000, combustible: 'Nafta',
    motor: '2.0 i-VTEC', potencia: '155 cv', caja: 'Automática CVT',
    traccion: 'Delantera', color: 'Blanco Perlado', ubicacion: 'La Plata, Buenos Aires',
    patente: 'AC 733 NP', duenos: 1, estado: 'Excelente',
    servicios: 'Servicios Honda al día. Muy bien mantenido.',
    neumaticos: 'Michelin Primacy — 65% de vida útil',
    interior: 'Cuero impecable, techo solar. Muy espacioso.',
    exterior: 'Pintura perlada en excelente estado.',
    observaciones: 'Sedán premium, confiable y confortable. Un Honda muy cuidado.',
    equipamiento: ['Pantalla táctil', 'Apple CarPlay / Android Auto', 'Cámara LaneWatch', 'Techo solar eléctrico', 'Faros LED', 'Llantas 17"'],
    seguridad: ['6 airbags', 'ABS + EBD', 'Control de estabilidad', 'Cámara LaneWatch', 'Control de tracción', 'ISOFIX'],
    confort: ['Climatizador bizona', 'Butacas de cuero eléctricas', 'Encendido por botón', 'Volante multifunción', 'Sensor de lluvia y luz'],
    img: IMG_AUTO[7], galeria: gal(IMG_AUTO, 3),
  },

  /* ---------------------------- MOTOS ---------------------------- */
  {
    id: 16, tipo: 'moto', marca: 'Honda', modelo: 'Wave 110', version: 'S 110cc',
    anio: 2022, precio: 2800000, km: 12000, combustible: 'Nafta',
    motor: '109 cc monocilíndrico', potencia: '8,4 cv', caja: 'Semiautomática 4 vel.',
    traccion: 'Cadena', color: 'Rojo', ubicacion: 'La Plata, Buenos Aires',
    patente: 'A123BCD', duenos: 1, estado: 'Excelente',
    servicios: 'Service al día en Honda. Muy bajo consumo.',
    neumaticos: 'Originales — 75% de vida útil',
    interior: 'No aplica.',
    exterior: 'Plásticos originales sin roturas ni caídas.',
    observaciones: 'La moto más elegida del país por su bajo consumo y fiabilidad. Ideal para ciudad.',
    equipamiento: ['Tablero digital-analógico', 'Arranque eléctrico y a pedal', 'Portapaquetes', 'Baúl trasero'],
    seguridad: ['Freno de disco delantero', 'Freno a tambor trasero', 'Luces LED de posición', 'Traba de manubrio'],
    confort: ['Asiento biplaza cómodo', 'Bajo consumo (~55 km/l)', 'Encendido eléctrico', 'Fácil manejo'],
    img: IMG_MOTO[0], galeria: [IMG_MOTO[0], IMG_MOTO[1], IMG_MOTO[2]],
  },
  {
    id: 17, tipo: 'moto', marca: 'Honda', modelo: 'CB190R', version: '190cc',
    anio: 2021, precio: 3900000, km: 18000, combustible: 'Nafta',
    motor: '184 cc monocilíndrico', potencia: '16,5 cv', caja: 'Manual 5 vel.',
    traccion: 'Cadena', color: 'Negro Mate', ubicacion: 'La Plata, Buenos Aires',
    patente: 'A456EFG', duenos: 1, estado: 'Muy bueno',
    servicios: 'Servicios realizados. Cadena y kit de arrastre en buen estado.',
    neumaticos: 'Originales — 60% de vida útil',
    interior: 'No aplica.',
    exterior: 'Estética naked cuidada, sin caídas.',
    observaciones: 'Naked deportiva ideal para quien busca dar el salto a más cilindrada. Muy ágil.',
    equipamiento: ['Tablero digital', 'Faro full LED', 'Llantas de aleación', 'Arranque eléctrico'],
    seguridad: ['Freno de disco delantero y trasero', 'Neumáticos anchos', 'Luces LED', 'Traba de manubrio'],
    confort: ['Posición de manejo cómoda', 'Buen alcance de frenos', 'Asiento biplaza', 'Bajo mantenimiento'],
    img: IMG_MOTO[1], galeria: [IMG_MOTO[1], IMG_MOTO[3], IMG_MOTO[0]],
  },
  {
    id: 18, tipo: 'moto', marca: 'Yamaha', modelo: 'FZ', version: 'FZ-S FI 3.0 150cc',
    anio: 2021, precio: 4200000, km: 15000, combustible: 'Nafta',
    motor: '149 cc inyección', potencia: '12,4 cv', caja: 'Manual 5 vel.',
    traccion: 'Cadena', color: 'Azul', ubicacion: 'La Plata, Buenos Aires',
    patente: 'A789HIJ', duenos: 1, estado: 'Excelente',
    servicios: 'Service oficial Yamaha al día. Inyección electrónica sin fallas.',
    neumaticos: 'Originales anchos — 70% de vida útil',
    interior: 'No aplica.',
    exterior: 'Impecable, con cubre tanque y protectores.',
    observaciones: 'Una de las naked más vendidas. Robusta, económica y con gran reventa.',
    equipamiento: ['Tablero full digital', 'Faro LED', 'Sistema de inyección FI', 'Llantas de aleación'],
    seguridad: ['Freno de disco delantero', 'Sistema UBS de frenos', 'Neumático trasero ancho', 'Luces LED'],
    confort: ['Asiento ergonómico', 'Buen torque a bajas vueltas', 'Bajo consumo', 'Posición erguida cómoda'],
    img: IMG_MOTO[2], galeria: [IMG_MOTO[2], IMG_MOTO[4], IMG_MOTO[1]],
  },
  {
    id: 19, tipo: 'moto', marca: 'Bajaj', modelo: 'Rouser NS200', version: '200cc',
    anio: 2020, precio: 4600000, km: 22000, combustible: 'Nafta',
    motor: '199,5 cc líquida', potencia: '24,5 cv', caja: 'Manual 6 vel.',
    traccion: 'Cadena', color: 'Rojo', ubicacion: 'La Plata, Buenos Aires',
    patente: 'A321KLM', duenos: 2, estado: 'Muy bueno',
    servicios: 'Servicios al día. Refrigeración líquida revisada.',
    neumaticos: 'Originales — 55% de vida útil',
    interior: 'No aplica.',
    exterior: 'Buen estado general, con slider de protección.',
    observaciones: 'Deportiva accesible con excelente relación potencia/precio. Muy divertida.',
    equipamiento: ['Tablero digital', 'Refrigeración líquida', '6ta marcha', 'Llantas de aleación'],
    seguridad: ['Freno de disco delantero y trasero', 'Chasis perimetral', 'Neumáticos anchos', 'Luces de posición'],
    confort: ['Posición semideportiva', 'Buen andar en ruta', 'Asiento biplaza', 'Motor refrigerado por líquido'],
    img: IMG_MOTO[3], galeria: [IMG_MOTO[3], IMG_MOTO[0], IMG_MOTO[2]],
  },
  {
    id: 20, tipo: 'moto', marca: 'KTM', modelo: 'Duke 200', version: '200cc',
    anio: 2021, precio: 5500000, km: 16000, combustible: 'Nafta',
    motor: '199,5 cc inyección', potencia: '25 cv', caja: 'Manual 6 vel.',
    traccion: 'Cadena', color: 'Naranja', ubicacion: 'La Plata, Buenos Aires',
    patente: 'A654NOP', duenos: 1, estado: 'Excelente',
    servicios: 'Service oficial KTM al día. Excelente mantenimiento.',
    neumaticos: 'Metzeler originales — 65% de vida útil',
    interior: 'No aplica.',
    exterior: 'Chasis naranja y estética agresiva impecable.',
    observaciones: 'La naked deportiva más pura de su segmento. Chasis liviano y motor potente.',
    equipamiento: ['Tablero LCD invertido', 'Faro LED', 'Chasis trellis naranja', 'Llantas de aleación', 'Inyección Bosch'],
    seguridad: ['Freno de disco ByBre', 'ABS Bosch', 'Neumáticos deportivos', 'Luces LED'],
    confort: ['Posición deportiva', 'Motor muy potente para su cilindrada', 'Muy liviana', 'Suspensión WP'],
    img: IMG_MOTO[4], galeria: [IMG_MOTO[4], IMG_MOTO[2], IMG_MOTO[3]],
  },
];

/* Imagen de reemplazo (si falla la carga de Unsplash) — SVG con la marca */
function imgFallback(texto) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
      <rect width='100%' height='100%' fill='#1a1a1a'/>
      <rect x='2' y='2' width='796' height='496' fill='none' stroke='#E30613' stroke-width='3'/>
      <text x='50%' y='47%' fill='#ffffff' font-family='Poppins,Arial' font-size='40' font-weight='700' text-anchor='middle'>${texto}</text>
      <text x='50%' y='58%' fill='#E30613' font-family='Poppins,Arial' font-size='20' letter-spacing='4' text-anchor='middle'>BAKI AUTOMOTORES</text>
    </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
