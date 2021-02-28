CREATE TABLE tbl_user (
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) NOT NULL,
     id_card VARCHAR(100) NOT NULL,
     avatar_url varchar(255),
     gender VARCHAR(10),
     address VARCHAR(100),
     tel VARCHAR(12),
     age BIGINT,
     UNIQUE KEY unique_user_id (id)
) ENGINE=InnoDB;
