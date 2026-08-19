package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.config.JwtProvider;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Address;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.AddressRepo;
import com.ecommerceshop.ecommerceshop.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private AddressRepo addressRepo;
    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> user = userRepo.findById(userId);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserException("User not found");
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        System.out.println("jwt in findUserProfileByJwt"+jwt);

        String email=jwtProvider.getEmailFromJwtToken(jwt);
        System.out.println("email in findUserProfileByJwt"+email);
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new UserException("User not found");
        }

        System.out.println(
                "user in findUserProfileByJwt "
                        + user.getFirstName()
                        + " "
                        + user.getId()
        );

        return user;
    }

    public Address addAddress(String jwt, Address address) throws UserException {

        User user = findUserProfileByJwt(jwt);

        address.setUser(user);

        Address savedAddress = addressRepo.save(address);

        user.getAddresses().add(savedAddress);

        userRepo.save(user);

        return savedAddress;
    }

}
