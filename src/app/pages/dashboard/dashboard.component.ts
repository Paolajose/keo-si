import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService} from '../../firebase/firebase.service';
import Swal from 'sweetalert2'
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  closeResult = '';

  estudianteForm: FormGroup;

  idFirabaseActualizar: string;
  actualizar: boolean;

  public formGroup: FormGroup;
   oredenCompra = []; 
   oredenVenta = []; 
   contador = 0;
   ordenes = []; 
   ganancia = 0
    disponible = 0; 
    tasa = 0; 
    spreed2 = 0; 
    total = 0; 


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseService : FirebaseService
  ) { }

  config: any;
  collection = { count: 0, data: [] }
  
  ngOnInit(): void {
    this.idFirabaseActualizar = "";
    this.actualizar = false;
    //configuracion para la paginación
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };
    //inicializando formulario para guardar los estudiantes
    this.estudianteForm = this.fb.group({
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    //cargando todos los estudiantes de firebase
    this.firebaseService.getEstudiantes().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          cantidad: e.payload.doc.data().cantidad,
          precio: e.payload.doc.data().precio,
          tipo: e.payload.doc.data().tipo,
          fecha: e.payload.doc.data().fecha,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }
    );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-3',
        cancelButton: 'btn btn-danger m-3'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro que desea eliminar este registro?',
      text: "El registro se eliminara de manera permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebaseService.deleteEstudiante(item.idFirebase)
   
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Su registro se ha eliminado con exito.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          ' Su orden aun se encuentra en la lista de ordenes',
          'info'
        )
      }
    })
  }

  guardarEstudiante(): void {
    this.firebaseService.createEstudiante(this.estudianteForm.value).then(resp => {
      this.estudianteForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    })
  }

  actualizarEstudiante() {
    console.log(this.idFirabaseActualizar);
    if (this.idFirabaseActualizar) {
      this.firebaseService.updateEstudiante(this.idFirabaseActualizar, this.estudianteForm.value).then(resp => {
        this.estudianteForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }
  }


  openEditar(content, item: any) {

    //llenar form para editar
    this.estudianteForm.setValue({
      precio: item.precio,
      cantidad: item.cantidad,
      tipo: item.tipo,
      fecha: item.fecha
    });
    this.idFirabaseActualizar = item.idFirebase;
    this.actualizar = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.estudianteForm.reset();
    this.actualizar = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  calcular() {
        
    let auxCompra = this.oredenCompra; 
    let auxVenta = this.oredenVenta; 
    let spreed = 0; 
   
        this.oredenCompra.forEach(orden => {

            for (let i = 0; i < this.oredenVenta.length; i++)
            {
                console.log("aqui", orden.cantidad >= this.oredenVenta[i].cantidad)
                if (orden.cantidad >= this.oredenVenta[i].cantidad){
                    
                    spreed = this.oredenVenta[i].precio - orden.precio; 
                    this.ganancia = this.ganancia + (this.oredenVenta[i].cantidad * spreed); 
                    orden.cantidad = orden.cantidad - this.oredenVenta[i].cantidad; 
                    this.oredenVenta[i].estado = 0;
                    console.log("GANANCIA: ",this.ganancia);
                }

                if (orden.cantidad < this.oredenVenta[i].cantidad){
                    // if (oredenVenta[i].estado == 1){
                        let restante = this.oredenVenta[i].cantidad - orden.cantidad;
                        spreed = this.oredenVenta[i].precio - orden.precio; 
                        this.ganancia = this.ganancia + (orden.cantidad * spreed); 
                        this.oredenVenta[i].cantidad = restante; 
                        orden.estado = 0;
                        console.log("GANANCIA", this.ganancia);
                        console.log("se rompe el ciclo");
                        break; 
                    // }
                    
                }
            }
            console.log(orden); 
        });

        this.oredenCompra = auxCompra;
        this.oredenVenta = auxVenta; 

        Swal.fire({
          icon: 'success',
          title: 'Calculo de Ganancias',
          text: 'Ganancia: '+ this.ganancia
        })
    }



}
