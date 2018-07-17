import React from "react";
import "../../html/assets/css/global.css";
import "../../html/assets/css/style.css";
import "../../html/assets/css/reset.css";


export class SidebarClass extends React.Component {

    render() {
        return (


            <sidebar className="dashboard-link">
                <ul className="clearfix">
                    <li>
                        <a href="/CreateUser">CREAR USUARIO</a>
                    </li>
                    <li>
                        <a href="/UpdateUser">ACTUALIZAR USUARIO</a>
                    </li>
                    <li>
                        <a href="/DeleteUser">SUPRIMIR USUARIO</a>
                    </li>
                    <li>
                        <a href="/Wallet">Wallet</a>
                    </li>
                    <li>
                        <a href="/AmountTransferReport">Informe de Movimientos</a>
                    </li>
                    <li>
                        <a href="/BlockedUserReport">Reporte Usuarios Bloqueados</a>
                    </li>

                </ul>
            </sidebar>
        );
    }
}