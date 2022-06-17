package com.site.forum.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "forum")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name="forum_id")
    private Set<Forum> subForums;

    @OneToMany(mappedBy = "forum")
    private Set<Post> posts;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User creator;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Forum forum = (Forum) o;
        return id != null && Objects.equals(id, forum.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}