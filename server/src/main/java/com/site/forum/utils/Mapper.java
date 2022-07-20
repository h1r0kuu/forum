package com.site.forum.utils;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class Mapper {
    public <T, D> D convertTo(T data, Class<D> type) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(data, type);
    }

    public <T, D> List<D> listConvertTo(List<T> data, Class<D> type) {
        return data.stream()
                .map(t -> convertTo(t, type))
                .toList();
    }

    public <T, D> List<D> listConvertTo(Set<T> data, Class<D> type) {
        return data.stream()
                .map(t -> convertTo(t, type))
                .toList();
    }
}
