/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.4.14-MariaDB : Database - doleman
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`doleman` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `doleman`;

/*Table structure for table `booking` */

DROP TABLE IF EXISTS `booking`;

CREATE TABLE `booking` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_bayar` INT(11) DEFAULT NULL,
  `id_user` BIGINT(20) UNSIGNED DEFAULT NULL,
  `id_tiket` INT(11) DEFAULT NULL,
  `tgl` DATETIME DEFAULT NULL,
  `jml_pesan` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_book1` (`id_bayar`),
  KEY `fk_book3` (`id_tiket`),
  KEY `fk_book2` (`id_user`),
  CONSTRAINT `fk_book1` FOREIGN KEY (`id_bayar`) REFERENCES `pembayaran` (`id`),
  CONSTRAINT `fk_book2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_book3` FOREIGN KEY (`id_tiket`) REFERENCES `tiket` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

/*Data for the table `booking` */

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` LONGTEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` LONGTEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `metode_bayar` */

DROP TABLE IF EXISTS `metode_bayar`;

CREATE TABLE `metode_bayar` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

/*Data for the table `metode_bayar` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

INSERT  INTO `migrations`(`id`,`migration`,`batch`) VALUES 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_resets_table',1),
(3,'2014_10_12_200000_add_two_factor_columns_to_users_table',1),
(4,'2019_08_19_000000_create_failed_jobs_table',1),
(5,'2019_12_14_000001_create_personal_access_tokens_table',1),
(6,'2020_05_21_100000_create_teams_table',1),
(7,'2020_05_21_200000_create_team_user_table',1),
(8,'2020_11_08_194028_create_sessions_table',1);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `pembayaran` */

DROP TABLE IF EXISTS `pembayaran`;

CREATE TABLE `pembayaran` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_metode` INT(11) DEFAULT NULL,
  `STATUS` INT(11) DEFAULT NULL,
  `id_booking` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bayar1` (`id_metode`),
  KEY `fk_bayar2` (`id_booking`),
  CONSTRAINT `fk_bayar1` FOREIGN KEY (`id_metode`) REFERENCES `metode_bayar` (`id`),
  CONSTRAINT `fk_bayar2` FOREIGN KEY (`id_booking`) REFERENCES `booking` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

/*Data for the table `pembayaran` */

/*Table structure for table `penjaga` */

DROP TABLE IF EXISTS `penjaga`;

CREATE TABLE `penjaga` (
  `id` BIGINT(20) UNSIGNED NOT NULL,
  `id_wisata` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_penjaga2` (`id_wisata`),
  CONSTRAINT `fk_penjaga1` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_penjaga2` FOREIGN KEY (`id_wisata`) REFERENCES `wisata` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

/*Data for the table `penjaga` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` BIGINT(20) UNSIGNED NOT NULL,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` VARCHAR(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` BIGINT(20) UNSIGNED DEFAULT NULL,
  `ip_address` VARCHAR(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `sessions` */

INSERT  INTO `sessions`(`id`,`user_id`,`ip_address`,`user_agent`,`payload`,`last_activity`) VALUES 
('tKM1AJBe8r5h33L3VgP3kQKkkrGOkrAk2kn3nnVU',NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiT3dFUTFVaUJDemVzZ0ZyUTZSN1RIOWQxUkpWbmhJQmFWOFZGbks5cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDk6Imh0dHA6Ly9sb2NhbGhvc3QvZG9sZW1hbl9iYWNrZW5kL3B1YmxpYy9pbmRleC5waHAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1604875385);

/*Table structure for table `team_user` */

DROP TABLE IF EXISTS `team_user`;

CREATE TABLE `team_user` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `team_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` BIGINT(20) UNSIGNED NOT NULL,
  `role` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_user_team_id_user_id_unique` (`team_id`,`user_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `team_user` */

/*Table structure for table `teams` */

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) UNSIGNED NOT NULL,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_team` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teams_user_id_index` (`user_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teams` */

/*Table structure for table `tiket` */

DROP TABLE IF EXISTS `tiket`;

CREATE TABLE `tiket` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_wisata` INT(11) NOT NULL,
  `nama` VARCHAR(255) DEFAULT NULL,
  `harga` FLOAT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tiket` (`id_wisata`),
  CONSTRAINT `fk_tiket` FOREIGN KEY (`id_wisata`) REFERENCES `wisata` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tiket` */

/*Table structure for table `umum` */

DROP TABLE IF EXISTS `umum`;

CREATE TABLE `umum` (
  `id` BIGINT(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_umum` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

/*Data for the table `umum` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` VARCHAR(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_team_id` BIGINT(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `isPenjaga` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

/*Table structure for table `wisata` */

DROP TABLE IF EXISTS `wisata`;

CREATE TABLE `wisata` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(255) NOT NULL,
  `deskripsi` VARCHAR(255) DEFAULT NULL,
  `harga` FLOAT NOT NULL,
  `alamat` VARCHAR(255) NOT NULL,
  `waktu_opr` VARCHAR(255) NOT NULL,
  `max_visitor` INT(11) NOT NULL,
  `lat` DECIMAL(10,8) NOT NULL,
  `lng` DECIMAL(11,8) NOT NULL,
  `foto` BLOB DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `wisata` */

INSERT  INTO `wisata`(`id`,`nama`,`deskripsi`,`harga`,`alamat`,`waktu_opr`,`max_visitor`,`lat`,`lng`,`foto`) VALUES 
(1,'Ancol','Ancol Taman Impian tempat rekreasi terbesar di Indonesia. Beli tiket dufan, sea world, atlantis, samudra dan lainnya di ancol.com.',200000,'Jakarta Utara','06:00-22:00',200,-6.12931100,106.83342500,NULL),
(2,'Kota Tua','Kota Tua Jakarta, juga dikenal dengan sebutan Batavia Lama (Oud Batavia), adalah sebuah wilayah kecil di Jakarta, Indonesia. Wilayah khusus ini memiliki luas 1,3 kilometer persegi melintasi Jakarta Utara dan Jakarta Barat (Pinangsia, Taman Sari dan Roa Ma',20000,'Jakarta Barat','24 jam',200,-6.12930970,106.83287780,NULL),
(3,'Museum Nasional','Monumen Nasional atau yang populer disingkat dengan Monas atau Tugu Monas adalah monumen peringatan setinggi 132 meter (433 kaki) yang didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia untuk merebut kemerdekaan dari pemerintahan kolonia',20000,'Jakarta Pusat','08:00 - 18:00',100,-6.17726640,106.82324140,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
