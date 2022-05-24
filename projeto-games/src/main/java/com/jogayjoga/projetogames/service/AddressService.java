package com.jogayjoga.projetogames.service;

import java.util.List;
import java.util.Optional;

import com.jogayjoga.projetogames.exceptionhandler.NotFoundException;
import com.jogayjoga.projetogames.model.Address;
import com.jogayjoga.projetogames.model.Client;
import com.jogayjoga.projetogames.repository.AddressRepository;

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

    public void addAddress(Address address) throws NotFoundException {
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