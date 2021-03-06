import React from 'react'
import './home.css'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase, { db } from '../../firebase-config';
import {  ListUser } from '../../api';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class home extends React.Component {

  state = {
    isLogin: false,
    abiertoMensaje: false,
    abiertoMensajeNoAuth: false,
    id: '',
    uid: '',
    nombre: '',
    email: '',
    photo: '',
    rol: ''
  }

  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  abrirModalMensajeNoAutorizado = () => {
    this.setState({ abiertoMensajeNoAuth: !this.state.abiertoMensaje })
  }

  componentDidMount = () => {
    this.getUserState();
    this.getUserRol();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      var nombreVariable;
      if (user) {
        console.log('Sesion Iniciada');
        if(user.displayName.length >= 20){
          nombreVariable= user.displayName.slice(0,14) + "...";
        }else{
          nombreVariable = user.displayName;
        }
        this.setState({ nombre: nombreVariable, photo: user.photoURL, uid: user.uid, email: user.email });
      } else {
        window.location.href = '/';
      }
    });
  }

  getUserState = async () => {
    var id = localStorage.getItem('uid');
    const p = await ListUser(id);
    if (p.docs[0].data().estado === 'Pendiente') {
      this.abrirModalMensaje();
    }
    if (p.docs[0].data().estado === 'No Autorizado'){
      this.abrirModalMensajeNoAutorizado();
    }else {
      console.log('Tienes Acceso');
    }
  }

  getUserRol = async () => {
    var id = localStorage.getItem('uid');
    const p = await ListUser(id);
    this.setState({ rol: p.docs[0].data().rol });
    if (p.docs[0].data().rol === 'Vendedor') {
      document.getElementById('usuarios').style.display = "none";
      document.getElementById('productos').style.display = "none";
    }
    if (p.docs[0].data().rol === 'Pendiente') {
      this.abrirModalMensajeNoAutorizado();
    }
  }

  signOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch((error) => {
      alert('No se ha podido cerrar Sesion');
    });
  }


  render() {
    return (
      <div>
        <div className="sidebar close">
          <div className="logo-details">
            <i className='bx bxs-ghost'></i>
            <span className="logo_name">InnovApps</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/home">
                <i className='bx bx-grid-alt' ></i>
                <span className="link_name">Dashboard</span>
              </a>
            </li>

            <li>
              <div className="iocn-links" id="ventas">
                <a href="#">
                  <i className='bx bx-calculator' ></i>
                  <span className="link_name">Ventas</span>
                </a>
                <i className='bx bx-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a href="/crearVenta">Crear Venta</a></li>
                <li><a href="/ventas">Listar y Actualizar Ventas</a></li>
              </ul>
            </li>

            <li>
              <div className="iocn-links" id="productos">
                <a href="#">
                  <i className='bx bx-cart'></i>
                  <span className="link_name">Productos</span>
                </a>
                <i className='bx bx-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a href="/crear_producto">Crear Producto</a></li>
                <li><a href="/lproductos">Listar y Actualizar Productos</a></li>
              </ul>
            </li>

            <li>
              <div className="iocn-links" id="usuarios">
                <a href="#">
                  <i className='bx bx-user' ></i>
                  <span className="link_name">Usuarios</span>
                </a>
                <i className='bx bx-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a href="/usuarios">Listar y Actualizar Usuarios</a></li>
              </ul>
            </li>

            <li>
              <div className="profile-details">
                <div className="profile-content">
                  <img src={this.state.photo} alt="profileImg" />
                </div>
                <div className="name-job">
                  <div className="profile_name">{this.state.nombre}</div>
                  <div className="job">{this.state.rol}</div>
                </div>
                <i className='bx bx-log-out' onClick={this.signOut}></i>
              </div>
            </li>
          </ul>
        </div>
        {/* <section class="home-section">
          <div class="home-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur rem deserunt ipsa suscipit aperiam iste voluptas, rerum sunt ut non quisquam cum enim, necessitatibus vel? Ullam suscipit necessitatibus dolores.</p>
          </div>
        </section> */}

        <Modal isOpen={this.state.abiertoMensaje}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>Su cuenta esta en estado pendiente, vuelva a intentarlo en unos minutos.</ModalBody>
        </Modal>

        <Modal isOpen={this.state.abiertoMensajeNoAuth}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>Su cuenta no esta autorizada, para funcionar en el sistema.</ModalBody>
        </Modal>
      </div>
    )
  }
}

export default home;
