package com.site.forum.utils;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class Mapper {

    private final ModelMapper modelMapper;

    public <T, D> D convertTo(T data, Class<D> type) {
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
