package com.jogayjoga.projetogames.service;

import java.util.Optional;

import com.jogayjoga.projetogames.dto.ClientUpdateDto;
import com.jogayjoga.projetogames.dto.ClientUpdatePasswordDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Client;
import com.jogayjoga.projetogames.repository.ClientRepository;
import com.jogayjoga.projetogames.util.ProfileUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private AddressService addressService;

    private Client findOne(long id) throws NotFoundException {
        Optional<Client> user = clientRepository.findById(id);

        if (user == null ||  user.isEmpty() == true) {
            throw new NotFoundException("Client not found!");
        }

        return user.get();
    }

    public void create(Client client) throws BadRequestException {
        clientVerification(client);
        client.setPassword(BCrypt.hashpw(client.getPassword(), BCrypt.gensalt(10)));
        client.setProfile(ProfileUser.CLIENTE);
        clientRepository.save(client);

        addressService.create(client.getAddress());
    }

    public void update(long clientId, ClientUpdateDto clientUpdateDto) throws NotFoundException, BadRequestException {
        Client client = findOne(clientId);
        client.setId(clientId);
        client.setName(clientUpdateDto.getName());
        client.setBirthDate(clientUpdateDto.getBirthDate());
        client.setGender(clientUpdateDto.getGender());

        clientRepository.save(client);
    }

    public void updatePassword(long clientId, ClientUpdatePasswordDto clientUpdatePasswordDto) {
        Client client = findOne(clientId);
        client.setId(clientId);
        client.setPassword(BCrypt.hashpw(clientUpdatePasswordDto.getNewPassword(), BCrypt.gensalt(10)));
        clientRepository.save(client);
    }

    public Client findClient(long clientId) throws NotFoundException {
        Client client = findOne(clientId);
        return client;
    }

    private void clientVerification(Client client) throws BadRequestException {
        Client clientEmailVerifi = clientRepository.findByEmail(client.getEmail());

        if (clientEmailVerifi != null) {
            throw new BadRequestException("Email is already in use!");
        }

        if (client.getLegalNumber() == null) {
            throw new BadRequestException("Legal number is required!");
        }
    }
}