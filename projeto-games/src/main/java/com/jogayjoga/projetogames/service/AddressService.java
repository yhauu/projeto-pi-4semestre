package com.jogayjoga.projetogames.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.dto.AddressDto;
import com.jogayjoga.projetogames.dto.ClientDto;
import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Address;
import com.jogayjoga.projetogames.model.Client;
import com.jogayjoga.projetogames.repository.AddressRepository;
import com.jogayjoga.projetogames.util.ProfileUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    private Address findOne(long id) throws NotFoundException {
        Optional<Address> address = addressRepository.findById(id);

        if (address == null ||  address.isEmpty() == true) {
            throw new NotFoundException("Address not found!");
        }

        return address.get();
    }

    public void create(List<Address> listAddress, Client client) throws NotFoundException {
        for (Address address : listAddress) {
            address.setClient(client);
            addressRepository.save(address);
        }
    }

    public void addAddress(AddressDto addressDto, ClientDto clientDto) throws NotFoundException {
        Address address = new Address();
        Client client = new Client();
        List<Address> listAddress = new ArrayList<>();

        address.setZipCode(addressDto.getZipCode());
        address.setAddress(addressDto.getAddress());
        address.setDistrict(addressDto.getDistrict());
        address.setNumberAddress(addressDto.getNumberAddress());
        address.setComplementAddress(addressDto.getComplementAddress());
        address.setCity(addressDto.getCity());
        address.setUf(addressDto.getUf());
        address.setBillingAdrress(addressDto.isBillingAdrress());
        address.setDeliveryAddress(addressDto.isDeliveryAddress());

        client.setId(clientDto.getId());
        client.setName(clientDto.getName());
        client.setLegalNumber(clientDto.getLegalNumber());
        client.setEmail(clientDto.getEmail());
        client.setPassword(clientDto.getPassword());
        client.setBirthDate(clientDto.getBirthDate());
        client.setGender(clientDto.getGender());
        client.setProfile(ProfileUser.CLIENTE);

        listAddress.add(address);
        client.setAddress(listAddress);

        address.setClient(client);

        addressRepository.save(address);
    }

    public void delete(long addressId) throws NotFoundException {
        Address address = findOne(addressId);
        addressRepository.delete(address);
    }

    public Address findAddress(long addressId) throws NotFoundException {
        Address address = findOne(addressId);
        return address;
    }

    public List<Address> findAddressByClientId(long clientId) throws NotFoundException {
        List<Address> listAddress = addressRepository.findByClientId(clientId);
        return listAddress;
    }
}