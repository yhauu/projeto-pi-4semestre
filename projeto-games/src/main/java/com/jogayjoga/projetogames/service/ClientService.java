package com.jogayjoga.projetogames.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.dto.AddressDto;
import com.jogayjoga.projetogames.dto.ClientDto;
import com.jogayjoga.projetogames.dto.ClientUpdateDto;
import com.jogayjoga.projetogames.dto.ClientUpdatePasswordDto;
import com.jogayjoga.projetogames.exceptionhandler.BadRequestException;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Address;
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

        List<Address> address = client.getAddress();
        client.setAddress(null);

        clientRepository.save(client);
        addressService.create(address, client);
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

    public ClientDto findClient(long clientId) throws NotFoundException {
        Client client = findOne(clientId);
        ClientDto clientDto = new ClientDto();
        List<AddressDto> listAddressDto = new ArrayList<>();

        clientDto.setId(client.getId());
        clientDto.setName(client.getName());
        clientDto.setLegalNumber(client.getLegalNumber());
        clientDto.setEmail(client.getEmail());
        clientDto.setPassword(client.getPassword());
        clientDto.setBirthDate(client.getBirthDate());
        clientDto.setGender(client.getGender());

        for (Address address : client.getAddress()) {
            AddressDto addressDto = new AddressDto();

            addressDto.setId(address.getId());
            addressDto.setZipCode(address.getZipCode());
            addressDto.setAddress(address.getAddress());
            addressDto.setDistrict(address.getDistrict());
            addressDto.setNumberAddress(address.getNumberAddress());
            addressDto.setCity(address.getCity());
            addressDto.setUf(address.getUf());
            addressDto.setBillingAdrress(address.isBillingAdrress());
            addressDto.setDeliveryAddress(address.isDeliveryAddress());
            addressDto.setIdClient(address.getClient().getId());

            listAddressDto.add(addressDto);
        }
        clientDto.setAddress(listAddressDto);

        return clientDto;
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