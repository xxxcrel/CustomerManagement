package beer.cheese.entity.acl;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "acl_objectIdentity")
public class AclObjectIdentity {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "object_id_class")
    private AclClass aclClass;

    @ManyToOne
    @JoinColumn(name = "owner_sid")
    private AclSid owner;

    @OneToOne
    @JoinColumn(name = "parent_object")
    private AclObjectIdentity parent;

    @Column(name = "object_id_identity")
    private String objectIdIdentity;

    @Column(name = "entries_inheriting")
    private String entriesInheriting;
}
