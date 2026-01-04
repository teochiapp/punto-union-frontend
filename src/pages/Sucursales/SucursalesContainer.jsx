import SucursalesView from './SucursalesView';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';

const SucursalesContainer = () => {
    // Datos de sucursales con imágenes
    const sucursales = [
        {
            id: 1,
            year: '2020',
            nombre: 'BELGRANO',
            direccion: 'Av. Cabildo 2589, Belgrano',
            telefono: '+54 11 4785-2341',
            horario: 'Lun a Vie: 8:00 - 20:00, Sáb: 9:00 - 14:00',
            descripcion: 'Nuestra primera sucursal, inaugurada en 2020 en el corazón de Belgrano',
            image: '/sucursales/belgrano.jpg'
        },
        {
            id: 2,
            year: '2022',
            nombre: 'RETIRO',
            direccion: 'Av. Libertador 1250, Retiro',
            telefono: '+54 11 4312-8765',
            horario: 'Lun a Sáb: 8:00 - 20:00',
            descripcion: 'Expandimos nuestra presencia en 2022 con esta moderna sucursal en Retiro',
            image: '/sucursales/retiro.jpeg'
        },
        {
            id: 3,
            year: '2024',
            nombre: 'EZEIZA',
            direccion: 'Ruta 205 Km 32, Ezeiza',
            telefono: '+54 11 4295-1234',
            horario: 'Lun a Dom: 7:00 - 21:00',
            descripcion: 'Nuestra sucursal más grande, inaugurada en 2024 para servir a toda la zona sur',
            image: '/sucursales/ezeiza.jpg'
        },
        {
            id: 4,
            year: '2025',
            nombre: 'RAMOS MEJÍA',
            direccion: 'Av. Rivadavia 13450, Ramos Mejía',
            telefono: '+54 11 4658-9876',
            horario: 'Lun a Vie: 8:30 - 19:30, Sáb: 9:00 - 15:00',
            descripcion: 'Nuestra sucursal más reciente, abierta en 2025 en el oeste del Gran Buenos Aires',
            image: '/sucursales/ramos-mejia.jpg'
        }
    ];

    return (
        <>
            <Header />
            <SucursalesView sucursales={sucursales} />
            <Footer />
        </>
    );
};

export default SucursalesContainer;
