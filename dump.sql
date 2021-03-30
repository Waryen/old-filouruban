-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 30, 2021 at 07:19 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `filouruban`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `su` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `email`, `password`, `su`, `created_at`, `updated_at`, `api_token`, `remember_token`) VALUES
(1, 'Santos', 'Berge', 'wmonahan@example.com', '$2y$10$rh7m2gQuH/Z24z5xO1HY2uQFLZhSMYOaJJH4LFPPtzfNXVLSNfSLa', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', '8jgVaApBctjy3LgOnlxrG8Yjlnk6yvKPA4on5VkW8gyzzjdjmaedIN3hOHha5UMRqwo7NvdXr1TpFKsLXyEkVPLk5ylZfv4ZyvUE', 'nkA9rPpdIrTdTvBZYfe9tvyBSqGtUE1cWzdn506H8sJKyiSWvMkFZ339z3tY'),
(2, 'Orlo', 'Mante', 'koch.mercedes@example.net', '$2y$10$w0WHbTd6nCLrd/DKLTkVFe3SWpZLXNmjfR4iHme3d2SVo7z2uDfJq', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', 'T56ldh0H0Gcl8IFpaX6pSD8Gav7y1GTZneBv3x3Ele4g1U0dVWqv2xkAaaBJP9Gd0rXpJGNEXdODJelCM61xJzSGqSMHF3OqcgdA', NULL),
(3, 'Lavada', 'Schoen', 'ziemann.sally@example.net', '$2y$10$J7/sqjW6F4Agg.DDSCocHeMSmJfgMZOZ3eNM//srztYuIV9wbQenu', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', '7K9wYnTZ0rpoysrxdDQMLTh7AvrNBlJgnhFEUmIt0yEcGFb1ceL3G9EWkfElZvO3FoAIrnRmzdOgQbM9A9fYHxKZ2c37UREPqoAF', NULL),
(4, 'Trycia', 'Roob', 'hortense.weber@example.com', '$2y$10$1z/J7Lr98d3.Oj2/CQEXuuSj40K4JfQqKKDDSig.0hOB2w0QYDNhm', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', 'Uq2pxJ8Bm7M56jti1DmTAu9DIMvPQEhtAuXZgheReSHO8Xe48R3FCabmlJAk9jEz8nuKze4sBn5skTeLhF90u8NkI6J2Euz3qvGs', NULL),
(5, 'Cindy', 'Mitchell', 'cletus.ohara@example.net', '$2y$10$8Di7ogjlHlBY/DY0GOCQd.A1C266dM3FReN2qx2VEv.GumsZ16F/O', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', 'JYcwxv7vgUFrsORfmNLEBiMrIPRBzhknEoWyJWmHmYEQbPnZ3tGUAEirbp1kr4Man3XYYRO1rgiB3gzdvtGxyBwf0cq32eBDqshu', NULL),
(6, 'Isac', 'Spinka', 'tadams@example.org', '$2y$10$WAcB7JlqL8SZdJ7vjPoS5OzM.hvDxQo9zdWKlvoFZHNu/kYf6py7m', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', 'vcHHIi2aZXtGAd1MVLcm2GIGhkIeQOJQsrJUYR2XwWXmgGJNmTZp3JJLOGfyVl9rJPCBY2iIXx35MPMcjrmvl4zSmSXxWBSLi5eD', NULL),
(7, 'Grace', 'Bergnaum', 'lgrady@example.net', '$2y$10$jd/3jWnQqAp6h.lmJS1ZNuJnLQTgTEdg0XrMNNgb6A6SjAO2SZsxC', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', 'UAl5O3f9RtgFacT9HtxYtgDwPUa5WxeRWmObnEa6JLDbYGYbKSgY2ruLAVceikbIeAFTYusjAeTCGuovIHUpryJ2eiRe8fjfXJ2Z', NULL),
(8, 'Jennings', 'Konopelski', 'casper.cleo@example.org', '$2y$10$fK8MdRucixDCCcWdN0oHOedK8lW1mwxFhW0jQA.gMU1hqQPLVIgeW', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', 'ZAcu0ahCYi81KJ7n7M63V4LfGZswF8gA1EXTo5r5UuaYb7sjD1iCDlLDD9O7SUrheXoGpEJ4OcMumhncfgn0Itr8vMU1e4ybQGwt', NULL),
(9, 'Stephen', 'Lowe', 'bayer.rory@example.org', '$2y$10$ciAoxfi09SQT2QB2wfg5zeLtuxS1vGcmd8TdszkXya45S.hKacIi2', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', '5BIkJSPsXgbPUqG3LlX6gVz0eoUvywEo1Ra48J9v3IrEFfGCuieZHrNu1edY9FVzs8JTwCIxEHuzy41g48atmQjrCdyh0vnv5tXl', NULL),
(10, 'Isaias', 'Kohler', 'shannon.ratke@example.com', '$2y$10$5hh.MXzO6UQPIQM.9myX5uiy5.N1Oug/QNWu1GadLtif.tHPI2/Vm', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43', '0D3Ltf8ezT7ryjXlHWtFltRaRg3s68EtoW8RxUXvWqmFYYytCd9aAV9XMKIqYJQ9mGCFOZm9WSTAHHH8omdLwdyD6QfL6WoPB1Kg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `categories_id` bigint(20) UNSIGNED NOT NULL,
  `admins_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `name`, `description`, `created_at`, `updated_at`, `categories_id`, `admins_id`) VALUES
(1, 'nobis', 'Labore et voluptas perferendis in unde amet inventore. Accusantium quidem impedit qui quis. Ex reprehenderit nesciunt quaerat ut explicabo dolore.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 2, 10),
(2, 'est', 'Qui explicabo sed dolore sit voluptas ut ipsa. Deleniti omnis voluptatibus aut corporis qui voluptatem. Natus et eligendi culpa quos est sed molestiae.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 2, 9),
(3, 'optio', 'Ut voluptatem voluptas quia omnis. Sunt dolorum ratione qui. Aut omnis vitae quia consectetur assumenda facilis.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 9, 2),
(4, 'culpa', 'Temporibus repudiandae molestiae qui doloribus eos. Aut consequatur soluta eum labore. Unde voluptas voluptates aut vitae voluptatem voluptate.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 8, 7),
(5, 'doloribus', 'Autem ut necessitatibus at. Amet id nihil voluptatem delectus qui officia voluptate. Et eaque laudantium nulla voluptates.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 10, 1),
(6, 'repellendus', 'Accusamus et ea nisi quisquam architecto hic. Dicta libero aliquam architecto. Perspiciatis laudantium in aut velit veritatis quasi quis.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 1, 8),
(7, 'fuga', 'Et reprehenderit velit in sequi. Maxime quis inventore et est officia. Non quia rerum aut non adipisci.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 5, 2),
(8, 'vitae', 'Est aut ipsum id sit totam. Eum harum deserunt odit eos amet voluptatum doloremque. Corporis fuga natus laborum quidem dicta et.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 10, 7),
(9, 'ea', 'Consequatur cum quidem rerum impedit et maxime tempora. Velit maxime corrupti qui harum. Ut repellat aperiam qui.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 3, 10),
(10, 'aliquam', 'Aliquam quis tempora blanditiis sapiente. Nostrum sit aut accusantium perspiciatis. Quod tempora officiis sit dicta nobis dolorum.', '2021-03-30 14:12:43', '2021-03-30 14:12:43', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'et', 'Sint soluta error blanditiis.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(2, 'sed', 'Consequatur qui quo.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(3, 'enim', 'Tempore fugit quia quae.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(4, 'pariatur', 'Veritatis in laboriosam labore.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(5, 'quo', 'Fugit fuga distinctio.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(6, 'voluptates', 'Ut sapiente nulla quas.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(7, 'qui', 'Cumque libero mollitia.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(8, 'quis', 'Eaque id occaecati culpa deserunt.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(9, 'iste', 'Suscipit dolores repudiandae cupiditate.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(10, 'eos', 'Qui consectetur aspernatur rem.', '2021-03-30 14:12:43', '2021-03-30 14:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `commentaries`
--

CREATE TABLE `commentaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `articles_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `commentaries`
--

INSERT INTO `commentaries` (`id`, `firstname`, `lastname`, `content`, `date`, `articles_id`, `created_at`, `updated_at`) VALUES
(1, 'Baylee', 'Feil', 'Tempora et voluptate dolor culpa cumque accusamus. Pariatur ex non temporibus consequuntur. Ipsa est exercitationem dolore repudiandae at.', '2008-05-27', 4, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(2, 'Dortha', 'Lesch', 'Ut pariatur accusamus optio non. Omnis reprehenderit omnis iusto asperiores quis at. Labore dolores nesciunt a qui et omnis reprehenderit vero.', '1992-11-17', 10, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(3, 'Marjolaine', 'Buckridge', 'Distinctio odit ducimus sit et laborum quia. Enim et necessitatibus rerum id est quod. Natus ab odit sunt sapiente explicabo provident.', '2007-03-18', 9, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(4, 'Janice', 'Mann', 'Praesentium quam et molestias mollitia aut nihil. Sapiente at possimus voluptatum consequatur. Quis consequatur distinctio quia ut nemo nihil incidunt.', '1981-10-14', 4, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(5, 'Charlotte', 'Kuphal', 'Ratione quae quidem eveniet dolorem. Ex officia repellat vel qui debitis. Ad ex deserunt optio illo molestiae magni.', '1995-10-11', 5, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(6, 'Henderson', 'Mayer', 'Voluptatum placeat velit molestias excepturi voluptatem mollitia. Consequuntur ipsa qui vel corrupti. Reiciendis sint omnis est harum illo accusantium blanditiis.', '1970-09-30', 2, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(7, 'Baylee', 'Dibbert', 'Cupiditate dolore quis aliquam architecto consequuntur. Cumque et non repellendus eaque eum porro. Iure corrupti et sit tempora.', '2002-08-01', 9, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(8, 'Dorothy', 'Cole', 'Veniam porro possimus adipisci qui voluptas voluptas tenetur dolores. Et aliquid itaque omnis deserunt quia deleniti aut ullam. Voluptatem ducimus corporis et quisquam ducimus itaque ipsam.', '2000-10-08', 5, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(9, 'Lelia', 'Corwin', 'Eum voluptates aut error magni quibusdam quas. Explicabo recusandae fugiat atque aut. Totam et omnis assumenda velit.', '2011-07-27', 8, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(10, 'Bennett', 'Sauer', 'Dolores illum qui itaque dolorem et voluptatem. Aliquam et blanditiis dolores voluptatem est facilis officia error. Rerum ut totam corporis et dolore ut repellendus.', '1978-05-31', 1, '2021-03-30 14:12:43', '2021-03-30 14:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `firstname`, `lastname`, `email`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Immanuel', 'Stehr', 'aubrey36@example.com', 'Corrupti quisquam culpa commodi. Dolores et error quo sapiente laborum nihil. Inventore tenetur quia sed adipisci ut. Nemo sed nobis est iste veniam suscipit. Quibusdam nobis deleniti dignissimos libero repellat commodi.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(2, 'Pascale', 'Quitzon', 'mercedes.heidenreich@example.net', 'Ducimus vero molestiae est eaque tempora error dolores quo. Quam reiciendis commodi neque aperiam et similique et. Mollitia maiores placeat natus id magnam officiis ipsum. Est enim non est autem tempora dicta. Aut velit voluptatibus occaecati rerum officia corrupti.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(3, 'Dusty', 'Gorczany', 'elvie40@example.net', 'Nostrum cum quod odio autem aut nostrum. Laboriosam fugit recusandae cum ipsa. Aperiam est eligendi qui blanditiis facilis qui explicabo. Et sint ullam expedita.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(4, 'Misael', 'Schowalter', 'piper.green@example.com', 'Autem maiores dolore molestiae itaque ipsum occaecati eveniet. Rerum sint et quis. Dolores aliquam excepturi est vel autem. Placeat qui fugiat facilis omnis quaerat.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(5, 'Gilberto', 'Huel', 'leuschke.stella@example.net', 'Veritatis ut et dolore qui reiciendis id eveniet. Possimus eos id praesentium et consequatur harum. Qui et laborum et est tempora commodi vitae. Delectus error nisi quod unde. Perferendis et ratione laboriosam quia nobis. In qui nam id.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(6, 'Larue', 'Konopelski', 'chaya.herman@example.net', 'Voluptas dolores debitis eligendi officia. Dicta odit enim voluptas repellat odit facere enim. Sint consequatur asperiores sit qui fugit iste tenetur non. Assumenda et corrupti quam placeat corporis. Et deleniti soluta nulla fuga et est.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(7, 'Keith', 'Toy', 'celestine.lemke@example.net', 'Distinctio fugiat similique perferendis consectetur distinctio. Consequuntur aut aut nihil quia. Sit temporibus eaque ullam quaerat qui sit rerum necessitatibus. Maiores error id molestias nesciunt voluptas eos vero tenetur. Quos iste in sit tenetur fugiat repellat illum. Nostrum omnis est quisquam error animi. Excepturi repellat dolore officiis magnam deserunt id cumque eos.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(8, 'Jace', 'Trantow', 'hilda43@example.org', 'Mollitia suscipit nisi at consectetur. Ipsam quia similique labore aut qui odit. Nisi est rerum qui saepe voluptatem autem libero. Fugiat praesentium neque nulla accusantium quo qui.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(9, 'Catalina', 'Farrell', 'mireille.schumm@example.net', 'Voluptas optio eum laboriosam occaecati ipsum aspernatur quia. Pariatur a autem commodi consequatur ullam aspernatur eligendi. Suscipit ad enim hic eveniet laboriosam. Nihil architecto ut numquam cupiditate laudantium.', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(10, 'Kali', 'Breitenberg', 'alexandrine.hessel@example.com', 'Labore iusto fugiat laudantium minus ullam laboriosam sunt. Ullam aut veritatis quam et libero sunt eligendi. Odit dolor dignissimos a reprehenderit perspiciatis unde quaerat itaque. Sunt officia dolorem ipsa. Molestias aspernatur amet vitae. Ut nihil dolorem eos sed est tempore nobis sunt. Aliquam in omnis enim eaque.', '2021-03-30 14:12:43', '2021-03-30 14:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `admins_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `title`, `content`, `start_date`, `end_date`, `admins_id`, `created_at`, `updated_at`) VALUES
(1, 'dolorum', 'Eos sapiente qui et velit nam aut reiciendis ea. Dolorem tempora non nisi accusantium at ipsam harum dolore. Molestiae perferendis quis corporis blanditiis asperiores.', '2002-10-07', '2013-05-01', 5, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(2, 'non', 'Et ut error accusantium et qui quisquam. Cupiditate dicta possimus occaecati magnam sed qui. Ex odio voluptas molestiae vel voluptas vero.', '2007-04-15', '2017-12-12', 8, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(3, 'numquam', 'Autem reiciendis voluptatem assumenda odio quis ut accusamus. Et quo tempore ut laudantium eum. Ex voluptas explicabo consequatur at.', '2001-08-24', '2018-01-09', 9, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(4, 'excepturi', 'Quae non qui doloremque rerum. Eaque enim tenetur ab ab odit sed tenetur. Rem est ut atque.', '2005-10-03', '2014-02-09', 3, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(5, 'ut', 'Quo tempore qui et eos. Consequatur reiciendis non rerum ad non. Sit ut aperiam rerum sequi.', '2003-09-27', '2020-04-12', 9, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(6, 'ut', 'Consectetur omnis molestias velit aut quia est. Laudantium vero non laudantium qui consequatur et reiciendis. Quis et quo similique et impedit in.', '2004-04-15', '2012-03-29', 10, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(7, 'rerum', 'Explicabo sed est veniam officia ratione eveniet. Ut voluptatem ullam est quo voluptates ut. Maiores qui et occaecati molestiae aut.', '2004-11-02', '2015-05-17', 2, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(8, 'ab', 'Perspiciatis eius aut maxime voluptate et expedita omnis. Ut deleniti eum dolorum placeat. Sequi ut quibusdam vero dolore.', '2000-10-13', '2019-08-31', 9, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(9, 'minima', 'Officia expedita eveniet iste repudiandae error. Consequatur ex iusto voluptas perferendis labore et qui. Nam optio voluptatem molestiae rem qui vitae soluta eos.', '2002-08-19', '2013-04-03', 7, '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(10, 'sunt', 'Minus nihil odio quia cumque. Error doloremque in ipsum vel vitae quo nemo vero. Dolores reiciendis quisquam occaecati molestiae.', '2001-07-01', '2012-06-07', 2, '2021-03-30 14:12:43', '2021-03-30 14:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(113, '2014_10_12_000000_create_users_table', 1),
(114, '2014_10_12_100000_create_password_resets_table', 1),
(115, '2019_08_19_000000_create_failed_jobs_table', 1),
(116, '2021_03_27_195859_create_admins_table', 1),
(117, '2021_03_27_200617_create_categories_table', 1),
(118, '2021_03_27_200745_create_articles_table', 1),
(119, '2021_03_27_201906_create_messages_table', 1),
(120, '2021_03_27_202342_create_contact_table', 1),
(121, '2021_03_27_202531_create_subscribers_table', 1),
(122, '2021_03_27_202641_create_commentaries_table', 1),
(123, '2021_03_29_133208_update_admins_table_api_token', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `created_at`, `updated_at`) VALUES
(1, 'doyle.keanu@example.com', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(2, 'nikolaus.fritz@example.com', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(3, 'wilfredo61@example.net', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(4, 'schultz.torrance@example.org', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(5, 'macy.marvin@example.net', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(6, 'julien85@example.net', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(7, 'trever.kutch@example.com', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(8, 'donnelly.mohammed@example.com', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(9, 'giuseppe.haag@example.net', '2021-03-30 14:12:43', '2021-03-30 14:12:43'),
(10, 'huels.ashton@example.net', '2021-03-30 14:12:43', '2021-03-30 14:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_api_token_unique` (`api_token`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_categories_id_foreign` (`categories_id`),
  ADD KEY `articles_admins_id_foreign` (`admins_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commentaries`
--
ALTER TABLE `commentaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentaries_articles_id_foreign` (`articles_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_admins_id_foreign` (`admins_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `commentaries`
--
ALTER TABLE `commentaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_admins_id_foreign` FOREIGN KEY (`admins_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `commentaries`
--
ALTER TABLE `commentaries`
  ADD CONSTRAINT `commentaries_articles_id_foreign` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_admins_id_foreign` FOREIGN KEY (`admins_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
