package com.site.forum.validations;

import com.site.forum.constraints.PasswordConstraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<PasswordConstraint,String> {
    @Override
    public void initialize(PasswordConstraint constraintAnnotation) {}

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        char ch;
        boolean capitalFlag = false;
        boolean specialCharacters;

        for(int i = 0; i < s.length(); i++) {
            ch = s.charAt(i);
            if(Character.isUpperCase(ch)) {
                capitalFlag = true;
                break;
            }
        }

        Pattern special = Pattern.compile ("[.!@#$%&*()_+=|<>?{}\\[\\]~-]");
        Matcher hasSpecial = special.matcher(s);
        specialCharacters = hasSpecial.find();
        return capitalFlag && specialCharacters;
    }
}
