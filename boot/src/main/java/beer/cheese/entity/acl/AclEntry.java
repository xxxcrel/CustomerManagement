package beer.cheese.entity.acl;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "acl_entry")
public class AclEntry {

    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "acl_object_identity")
    private AclObjectIdentity objectIdentity;

    @Column(name = "ace_order")
    private int aceOrder;

    @ManyToOne
    @JoinColumn(name = "sid")
    private AclSid sid;

    private Integer mask;

    private boolean granting;

    @Column(name = "audit_success")
    private boolean auditSuccess;

    @Column(name = "audit_failure")
    private boolean auditFailure;
}
