import { Component } from '@angular/core';
import { debug } from 'util';
import { url } from 'inspector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  categorias: Categoria[] = [
    {
      titulo: 'Día de la mujer',
      imagen: '../../assets/img/categorias/mujer.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      activa: 'block'
    },
    {
      titulo: 'Día del padre',
      imagen: '../../assets/img/categorias/padre.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      activa: 'none'
    },
    {
      titulo: 'Día de la naturaleza',
      imagen: '../../assets/img/categorias/naturaleza.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      activa: 'none'
    },
    {
      titulo: 'Día de la poesía',
      imagen: '../../assets/img/categorias/poesia.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      activa: 'none'
    },
    {
      titulo: 'Día del beso',
      imagen: '../../assets/img/categorias/beso.jpg',
      informacion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio cumque necessitatibus! Sequi blanditiis, provident, quos voluptate iusto consectetur qui vitae dolor culpa vero nam asperiores nobis eaque accusantium minima!',
      activa: 'none'
    }
  ];

  anterior() {

    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.categorias.forEach(categoria => {
      if (categoria.activa === 'block')
        posicion = indice;
      indice++;
    });

    // Desactivamos la categoría activa
    this.categorias[posicion].activa = 'none';

    // Decrementamos la posición
    posicion = ( posicion === 0 ) ? this.categorias.length - 1 : posicion - 1;

    // Activamos la categoría anterior
    this.categorias[posicion].activa = 'block';
  }

  siguiente() {

    let indice  : number = 0;
    let posicion: number = 0;

    // Buscamos la posición de la categoría activa
    this.categorias.forEach(categoria => {
      if (categoria.activa === 'block')
        posicion = indice;
      indice++;
    });

    // Desactivamos la categoría activa
    this.categorias[posicion].activa = 'none';

    // Decrementamos la posición
    posicion = ( posicion === this.categorias.length - 1 ) ? 0 : posicion + 1;

    // Activamos la categoría anterior
    this.categorias[posicion].activa = 'block';
  }
}

interface Categoria {
  titulo: string;
  imagen: string;
  informacion: string;
  activa: string;
}
