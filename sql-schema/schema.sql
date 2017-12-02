CREATE TABLE IF NOT EXISTS `paddlebattle`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `pass` VARCHAR(255) NULL DEFAULT NULL,
  `isLoggedIn` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 92
DEFAULT CHARACTER SET = utf8

CREATE TABLE IF NOT EXISTS `paddlebattle`.`games` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `game_status` VARCHAR(255) NULL DEFAULT NULL,
  `master_user` INT(11) NULL DEFAULT NULL,
  `teamAScore` INT(11) NULL DEFAULT NULL,
  `teamBScore` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `master_user` (`master_user` ASC),
  CONSTRAINT `games_ibfk_1`
    FOREIGN KEY (`master_user`)
    REFERENCES `paddlebattle`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 99
DEFAULT CHARACTER SET = utf8

CREATE TABLE IF NOT EXISTS `paddlebattle`.`servers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `server_name` VARCHAR(255) NOT NULL,
  `game_started` TINYINT(1) NOT NULL,
  `game_id` INT(11) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `game_id` (`game_id` ASC),
  CONSTRAINT `servers_ibfk_1`
    FOREIGN KEY (`game_id`)
    REFERENCES `paddlebattle`.`games` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8

CREATE TABLE IF NOT EXISTS `paddlebattle`.`teams` (
  `user_id` INT(11) NOT NULL,
  `team` INT(11) NOT NULL,
  `game_id` INT(11) NOT NULL,
  INDEX `game_id` (`game_id` ASC),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `teams_ibfk_1`
    FOREIGN KEY (`game_id`)
    REFERENCES `paddlebattle`.`games` (`id`),
  CONSTRAINT `teams_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `paddlebattle`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8