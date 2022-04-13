package com.jogayjoga.projetogames.service;

import com.jogayjoga.projetogames.dto.UserLoginDto;
import com.jogayjoga.projetogames.model.User;
import com.jogayjoga.projetogames.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class UserLoginServiceTest {

    UserLoginService userLoginService;

    UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        User user = new User();

        this.userLoginService = new UserLoginService();
        this.userRepository = Mockito.mock(UserRepository.class);
        this.userLoginService.userRepository = this.userRepository;

        user.setEmail("matheus@jogayjoga"); //
        user.setPassword("mudar@123"); // 

        Mockito.when(userRepository.findByEmail("matheus@jogayjoga")).thenReturn(user); //SUCESSO

        Mockito.when(userRepository.findByEmail("Ferreira")).thenReturn(null); //DEU ERRADO. 
        
    }

    @Test
    @DisplayName("Sucesso")
    public void validaUsuarioSistema() throws Exception {

        UserLoginDto userLoginDto = new UserLoginDto();
        
        userLoginDto.setEmail("matheus@jogayjoga");
        userLoginDto.setPassword("mudar@123");

        User user = userLoginService.findUserLogin(userLoginDto);

        Assertions.assertEquals(user.getEmail(), userLoginDto.getEmail());

    }

    @Test
    @DisplayName("Campo Null/Vazio")
    public void validaUsuarioSistemaNull() throws Exception {
        
        UserLoginDto userLoginDto = new UserLoginDto();

        Exception exception = Assertions.assertThrows(Exception.class,()->userLoginService.findUserLogin(userLoginDto));

        Assertions.assertEquals("User or password was wrong!", exception.getMessage());

    }

    @Test
    @DisplayName("Campo diferente")
    public void validaUsuarioSistemaInvalido() throws Exception {

        UserLoginDto userLoginDto = new UserLoginDto();
        
        userLoginDto.setEmail("ferreira@jogayjoga");
        userLoginDto.setPassword("mudar@123");

        User user = userLoginService.findUserLogin(userLoginDto);

        Assertions.assertEquals(user.getEmail(), userLoginDto.getEmail());

    }


}
