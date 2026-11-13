package br.com.clinicaSp.clienteServlet;

import br.com.clinicaSp.model.Cliente;
import br.com.clinicaSp.model.Usuario;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/create-cliente")
public class CreateClienteServlet extends HttpServlet {

    @Override
    protected void doPost (HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String idCliente = req.getParameter("idCliente");
        String idUsuario = req.getParameter("idUsuario");

        
    }
}
