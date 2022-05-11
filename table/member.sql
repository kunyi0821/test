DROP TABLE If EXISTS `member`;
CREATE TABLE `member` (
    member_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "會員編號",
    name varchar(100) NOT NULL COMMENT "會員名稱",
    account varchar(100) NOT NULL COMMENT "會員帳號",
    password varbinary(255) NOT NULL COMMENT "會員密碼",
    updated_at datetime DEFAULT NULL COMMENT "修改時間",
    deleted_at datetime DEFAULT NULL COMMENT "刪除時間",
    created_at datetime DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間"
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4