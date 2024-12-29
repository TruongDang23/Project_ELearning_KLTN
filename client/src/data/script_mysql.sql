-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projectelearning
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--
use projectelearning;
DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `username` varchar(50) NOT NULL,
  `password` varchar(10000) NOT NULL,
  `userID` varchar(4) NOT NULL,
  `activity_status` varchar(20) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('KLTN_ADMIN','d6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0','A000','active'),('Auser2','385b5fb3512f87533f59837c26d0337dd8f3c7056e9607eb66e78fbc00fcdd52c6a5a3302eaf834df860379d8654924b00e5b34a059709c998bdc54772b794b2','A001','active'),('KLTN_INSTRUCTOR','d6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0','I000','active'),('Iuser2','385b5fb3512f87533f59837c26d0337dd8f3c7056e9607eb66e78fbc00fcdd52c6a5a3302eaf834df860379d8654924b00e5b34a059709c998bdc54772b794b2','I001','active'),('Iuser3','b8fc591b94af95420b1613a23458c90b4025c6fcb8b786f6aefd4d706384a178bfe1c9389f2d068956b4d13d50d9b5401ac6572e4413b4cc47ab63ae098ff71e','I002','active'),('Iuser4','b10efd62c6c76dbd202e540ae8103eb98a44c7baf8c08ada85f58c5f7ea3eccecd459132765fcd216e6a5c6ee37d06ed03158111e4db15b4251d3988c56c6c5e','I003','active'),('Iuser5','48e8c4dbac074317994bb7b97e0420ba65a1c352adf2774e988b763ac93bc42d7f13d111ef224092ad5aa1eb7326879e519bb7706f8a821fcae51460f94ec86d','I004','active'),('Iuser6','18a315d58a660541a1bfde7194b702ab84426c2ce2b70190ef1b8477341264402daa0bfe80d916442cd05ba310f94fe6cf6adf5a6199f6062f832d2c450a232e','I005','active'),('Iuser7','b72eebf86f33556b5eb194f3ff5e78effc0f542a960f91d51a2ad6854c7185249a2e34573200630480fcb4e328202f1c681e72e2217b02f02418af90bf50887b','I006','active'),('Iuser8','0804d617e7da1ffb7cbfad1ddd74d9cc3060966f8014c2b967f93818d88269d3f2d84e7ece6c3cf12dfa5ea14acbd483ee23a5d950a15cb0e046ab9e45e489c9','I007','active'),('Iuser9','871ca5430812eb4ba2b5007728ca01572051fb124bc17ea4fa1ce39002463a1a295cd2e94f804644f088f362ceea8ceee53d0149bd22217cc710adab13601c6c','I008','locked'),('Iuser10','09aeda870acd8cdc1fcac953034565363b7aadf7b67f916fff04acdd32c8e5dda3a60c938b5494bffbf8b5ed1924403a84868b132baf78d67106516aa9cdb631','I009','locked'),('KLTN_STUDENT','d6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0','S000','active'),('user2','385b5fb3512f87533f59837c26d0337dd8f3c7056e9607eb66e78fbc00fcdd52c6a5a3302eaf834df860379d8654924b00e5b34a059709c998bdc54772b794b2','S001','active'),('user3','b8fc591b94af95420b1613a23458c90b4025c6fcb8b786f6aefd4d706384a178bfe1c9389f2d068956b4d13d50d9b5401ac6572e4413b4cc47ab63ae098ff71e','S002','active'),('user4','b10efd62c6c76dbd202e540ae8103eb98a44c7baf8c08ada85f58c5f7ea3eccecd459132765fcd216e6a5c6ee37d06ed03158111e4db15b4251d3988c56c6c5e','S003','active'),('user5','48e8c4dbac074317994bb7b97e0420ba65a1c352adf2774e988b763ac93bc42d7f13d111ef224092ad5aa1eb7326879e519bb7706f8a821fcae51460f94ec86d','S004','active'),('user6','18a315d58a660541a1bfde7194b702ab84426c2ce2b70190ef1b8477341264402daa0bfe80d916442cd05ba310f94fe6cf6adf5a6199f6062f832d2c450a232e','S005','active'),('user7','b72eebf86f33556b5eb194f3ff5e78effc0f542a960f91d51a2ad6854c7185249a2e34573200630480fcb4e328202f1c681e72e2217b02f02418af90bf50887b','S006','active'),('user8','0804d617e7da1ffb7cbfad1ddd74d9cc3060966f8014c2b967f93818d88269d3f2d84e7ece6c3cf12dfa5ea14acbd483ee23a5d950a15cb0e046ab9e45e489c9','S007','active'),('user9','871ca5430812eb4ba2b5007728ca01572051fb124bc17ea4fa1ce39002463a1a295cd2e94f804644f088f362ceea8ceee53d0149bd22217cc710adab13601c6c','S008','active'),('user10','09aeda870acd8cdc1fcac953034565363b7aadf7b67f916fff04acdd32c8e5dda3a60c938b5494bffbf8b5ed1924403a84868b132baf78d67106516aa9cdb631','S009','active'),('user11','5c9c099389831b345d6e8b0c31433e6b1276a547f0f6290e421c89c18f8cb23f36e586331a3ee70d5461cd6ef37ee38728e7712a3bd5e6b926018b205ff36540','S010','locked'),('user12','200057456de74234004fc59db0a9329b34c9c697a5e4fe41cca1a8eb387cc251d4c5f74d7bd6d5f53e32079c20cdb662eb4753490ad91d873a71a42065aaf10b','S011','active'),('user13','744ba136a7215f4a0bf717dfb1d4927d09978db555236be27dbdfa10f1f8fcbf898369f5549ec611c8c18b6f8b4094498405d1a08e38d7f7820fe3c8d74a18d3','S012','active'),('user14','5354155ba88b0ae53267dc8c5b11f792e90878bc05d4a1855a4ebd5923f44bb7fc4ee38e7cc83f9f6e18f9c4cdc053bb25b38de2ba2b0e3344cd6b994a175766','S013','active'),('user15','369e0f5f95d6f83a4846a8fbc5e86c8a9adabe85fe675a4691c4b56bc3428dd18223e17b28c889cc54f3cf90a891ae2447606523963b786e96b648768d87697f','S014','active'),('user16','f993e846f53e815e345215baa4e771e10b68a378b9e7835e9f1b30b1ce9dcc29f6c1a29cd7393e8d73da32b4637d0cd558e3ec964438c3a669f4230ae5029aa4','S015','active'),('user17','ff4c3396952f42b18eaa1111f93e6d3f2bbbb9618cdd524998be8a0a80756709c9bf98af351c6f70b9a0d6a0494cdef77fe2bd14902870d4438385773d6d13a6','S016','active'),('user18','1290e90170a44c2cce33a6101764f9e262b7b8f0c98264e0f8e900595a61b3409cc4049682046a7e611cb3750e01c77c64a84037d9b49f44f5effa1276e41c34','S017','active'),('user19','f9eba4b518387a3322c8cd3a6232ef276c48d3bab835b3a2e115e7e4fb6321e0cbd153fa4feb13bd4a877d6c27904097f338af358d901d3587ecad13df48d9d1','S018','active'),('user20','a7f6afb3874b72812d5531578f70cc31470803cead329c5e0fa80205906b1a58b1eb29c0e47483796866ff5f6c66845b772db1dea99eaa6b2d26d6cd47720a05','S019','active'),('user21','9fef0738991624101e529486a2f1afb989b75ae4f753a213d0ce9fe2e4ab6a5f40265b9e64636e62e411c55957e87d42f54734b53393574ed385443dc945834c','S020','active'),('user22','7758270752e9a9a894883801cd83c6d61df59fcc1c56f39dc9f45fcaec76267a7214f1e220d0e5b23dfe32a6a90b62f488e53c2a801f07bc6c46703b2fe76629','S021','locked'),('user23','ec86631d2d14a72d3ae1346a72fa29b92f49950e958f8f124ad1c401996d4bfd8d101da2f8bf3ba3f8bb8644910935a087c2041b20f5b2100d2609d8a635d353','S022','active'),('user24','4cd0f505907f886a791e42ef3a84b5de1ffc580df349e5f35ef6f254e5f18bff8ba3f3c387c68b66fefc8676d0a5f27a6ac60950c68d3df78759baae79435ddc','S023','active'),('user25','a5c3e2b17f6331fc792f9eabb0fb0796b3cf27f4fe8e150028ff616e4fc22569c29812ef5618ed56939ffab0314bd155288a9bc0ab4db67cee1bdf69baf1543d','S024','active'),('user26','e829c8fd05e5d95a30fc9861a443091149d35d48b27d7c2c422c64760d8d41a04add440ccf1ff76ad65f165cda4668237a23d759d1da4ffe1cca257820a8f669','S025','active'),('user27','499c01dbc08966649bc22000e4ab80ccc14f92932723f19dc3493cb27e4bcb8bf810bae2b6978b22e72675ad23621879da8300d988286d89c654f81ff23e3c87','S026','active'),('user28','39478b878cbd7697c21a6e11474d3be0894a6eefdd5ced6c903a99005dc242d0cbcc1b9d05f824887b9ccbbd929a4077598e84f1270ebb6ffee37393e4d60f9c','S027','active'),('user29','437b92de5a8d728713798f5123e13f288769c91f49551f8847f091ee85ee478772e6a061303bcd47e1b8e0b48b4f763eef48f034518b3950d8f20cf03fdbecd1','S028','active'),('user30','365dd4fb548ce92d184381c6bf865628c4a976ee566b9900d5a4232226d86b5a9edba0626464d615880390600ec932b1836ff69acfa21db5f22d328b5595d4be','S029','active'),('user31','7a49bcf0a706149a42157f5f1bdcc1c44b4698485c0a698e230ed87aea48711dbf7d13963ff435fe0a6425afde9085aaa121c1dbdd2b581bffa186a3fee3288f','S030','locked'),('user32','5191c463ec535b6c3273d369a4dd1a3d49297c4b656f5e120855edfca6abf6a3c5f2a0fe780b192905b9bdaf2ad47bb30bd038d681710931e077f0a4c71b8f9b','S031','active'),('user33','f17a246e55537ee481a94463a267823161eed7cf961c38f737af1d12b50a88c26e2db122f6a583ac93a7dbfaa00db421ee00f4fc7d3f2826ed5c7a3aa5d9b317','S032','active'),('user34','7ae19de2eee45a0ca56c2cbae5cf516115ed9aec80f0f3f7b8fa865473d55edc6b39168323fa1bce954b504e5eeee53e5831866f32d031e5dbee10de12864b2c','S033','active'),('user35','3b0b77e8a084cacd6d89aedc48c19202fb4d55dd98812e421d274d7d19b4b6afbaf309343e5a0cc26bed64137e6aacaa3acfbe679f4ab86f5d37573593e4409e','S034','active'),('user36','119adc566f0d6a1ed87484a39a9f9725e337dddfbb32ec1ab4db2a9cc0227adc32df91395ce12f975468b0471a67eb8fdf3e5606fbb2383d63b64f3a48427146','S035','active'),('user37','493d99333944f005a3d5d23b50426954f6e7eead03c04dd4906f5351e727d1b57d3f07cda8275e4fd367f45cb413de3c7c7d0411bfb7c3f7743926a5d50f5f2e','S036','active'),('user38','cc679c929c123e90c8dade537406e46a8f64fda06f300fe10e5d4d80bd26bbc31bd326fc69046353ac7d4d7c86d0d6cac24083e7a6cb75ad4824ab72988e4bd7','S037','active'),('user39','b176ca25b7622884fc77fa358165bf77271427b7ef50a2b61015926c7360ae80a4550c6f18b56b8a52893dbe2241141562f532d28bb76ee77102167e5f3f033b','S038','active'),('user40','4d9831c15c394741d3abbd4bc720b5b60c0de18799519f08dc8b30d3c71404f66eb952b7533899ee09b6a2788a28af243fa153c46b1a38dec2fb130f88e351ad','S039','active'),('user41','d1588b5f520a625f06ad713fcfdb92fb3c9e7f5f6806f44cfa66f6a2b1ea4e886258d371a6ada7a1956e88b4d878669882ec0dbfa302ed13aa92373a5fedf355','S040','locked'),('user42','775faca6d8366830d6c5c8040e1f42de3bae36e1a9074ecb298ea3fb8e3990c71287e8e1169d27dac9ec68e097f56f48ff1937c0017778819223615950fb1f84','S041','active'),('user43','0753577ee7a54f5e3631d2205e76507eabfd1e34ea94d49734dd64edb25ac5599f3e4449dd1add4423e9ad6481a5a69d73c05b8bee1d1bc430e25e1a5a92e405','S042','active'),('user44','26a0ea84fcb89b23335eebfc64cdc5e6332c2d35f4a138724e3f7c57889fbfaee40a47205b0e4d566bfe42bcc2caad4e3e9cbadd6a83067e642fe16761668cac','S043','active'),('user45','94f9d60f4e8c05deacfbe4dff88593e96ee40e504916b213d071ea19eb311a49c10c968d1ee3c6ee0363bfd5b5e300768ecc2cd68431d75a329853768e09feec','S044','active'),('user46','8993f683912d478eba0959ea8dbb2133207ef11331264e4e1155f0e4bbde734073703df9188f556d4b7977f40a42e7de03927274ebcd81e400cfb88726a58eba','S045','active'),('user47','02155c76b504d03be185b4eb30a6bb0fea89dad940750fefbc3ee8e16ba6cb9061dd599cbf115f5dedbc431bc0e66b979b2ff9a69c1c5a3bfbb2092135880dac','S046','active'),('user48','72cc2631c555a644a61f80fc43b45b055fb40e54e5d868b335a8f36e00b14d006d142d3a0298ceab044939d6f1b46d36fb906a36aa59d17aedf3351d18c1be80','S047','active'),('user49','c88551f96eb606e72c254a705e6f980cb895ba5034ec4ef38114d35ff048f71b9c0083692ec63550c46ab0dcbf720428b7e1f60e9ca0153fcfb693f299a6e489','S048','active'),('user50','bcb562eb834f3360ec182e0ba94c92fb36b00c038a6b3371b338faff0dc6169e258b0ad2e6ab01bcdc8d10f8f07136fb69841529272bb4623a24cb7a052ba532','S049','active'),('21110705@student.hcmute.edu.vn','113091529657104207972','S050','active');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `avg_rating`
--

DROP TABLE IF EXISTS `avg_rating`;
/*!50001 DROP VIEW IF EXISTS `avg_rating`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `avg_rating` AS SELECT 
 1 AS `courseID`,
 1 AS `star`,
 1 AS `raters`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseID` varchar(4) NOT NULL,
  `type_of_course` varchar(20) DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `method` varchar(100) DEFAULT NULL,
  `language` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `currency` varchar(5) DEFAULT NULL,
  `program` varchar(50) DEFAULT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `course_for` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `num_lecture` int DEFAULT NULL,
  `userID` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`courseID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('C000','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',43,'I000'),('C001','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Master','published',43,'I001'),('C002','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Master','published',43,'I002'),('C003','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',43,'I003'),('C004','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Certificate','Database','Master','published',43,'I004'),('C005','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',43,'I005'),('C006','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Degree','Database','Beginner','published',43,'I006'),('C007','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',43,'I007'),('C008','Course','Nhập môn cơ sở dữ liệu','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Master','published',43,'I008'),('C009','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Degree','Database','Beginner','published',11,'I009'),('C010','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',11,'I000'),('C011','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Degree','Database','Beginner','published',11,'I001'),('C012','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Master','published',11,'I002'),('C013','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',11,'I003'),('C014','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Degree','Database','Beginner','published',11,'I004'),('C015','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Master','published',11,'I005'),('C016','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Degree','Database','Master','published',11,'I006'),('C017','Course','Cơ sở dữ liệu (cơ bản)','Self-directed study','Vietnamese',0.00,'VND','Knowledge','Database','Beginner','published',11,'I007'),('C018','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Degree','Machine Learning','Master','published',20,'I008'),('C019','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Certificate','Machine Learning','Beginner','published',20,'I009'),('C020','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Knowledge','Machine Learning','Master','published',20,'I000'),('C021','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Certificate','Machine Learning','Beginner','published',20,'I001'),('C022','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Knowledge','Machine Learning','Beginner','published',20,'I002'),('C023','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Degree','Machine Learning','Master','published',20,'I003'),('C024','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Knowledge','Machine Learning','Beginner','published',20,'I004'),('C025','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Degree','Machine Learning','Master','published',20,'I005'),('C026','Course','Làm chủ ChatGPT','Self-directed study','English',0.00,'VND','Knowledge','Machine Learning','Beginner','published',20,'I006'),('C027','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Certificate','Web development','Master','published',63,'I007'),('C028','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Knowledge','Web development','Master','published',63,'I008'),('C029','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Knowledge','Web development','Master','published',63,'I009'),('C030','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Degree','Web development','Master','published',63,'I000'),('C031','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Certificate','Web development','Beginner','published',63,'I001'),('C032','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Degree','Web development','Beginner','published',63,'I002'),('C033','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Knowledge','Web development','Master','published',63,'I003'),('C034','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Degree','Web development','Master','published',63,'I004'),('C035','Course','HTML, CSS, Javascript for web developer','Self-directed study','English',0.00,'VND','Knowledge','Web development','Beginner','terminated',63,'I001'),('C036','Course','C# programing','Self-directed study','English',0.00,'VND','Knowledge','Web development','Beginner','terminated',26,'I002'),('C037','Course','C# programing','Self-directed study','English',0.00,'VND','Certificate','Web development','Master','mornitor',26,'I009'),('C038','Course','C# programing','Self-directed study','English',0.00,'VND','Knowledge','Web development','Beginner','mornitor',26,'I002'),('C039','Course','C# programing','Self-directed study','English',0.00,'VND','Degree','Web development','Beginner','mornitor',26,'I003'),('C040','Course','C# programing','Self-directed study','English',0.00,'VND','Knowledge','Web development','Beginner','created',26,'I009'),('C041','Course','C# programing','Self-directed study','English',0.00,'VND','Knowledge','Web development','Master','created',26,'I001'),('C042','Course','C# programing','Self-directed study','English',0.00,'VND','Degree','Web development','Beginner','created',26,'I002'),('C043','Course','C# programing','Self-directed study','English',0.00,'VND','Certificate','Web development','Beginner','created',26,'I003'),('C044','Course','C# programing','Self-directed study','English',0.00,'VND','Knowledge','Web development','Beginner','created',26,'I004');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `created_course`
--

DROP TABLE IF EXISTS `created_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `created_course` (
  `courseID` varchar(4) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`courseID`),
  CONSTRAINT `created_course_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `created_course`
--

LOCK TABLES `created_course` WRITE;
/*!40000 ALTER TABLE `created_course` DISABLE KEYS */;
INSERT INTO `created_course` VALUES ('C040','2023-01-17 10:03:00'),('C041','2024-02-20 11:11:11'),('C042','2023-03-25 12:02:50'),('C043','2024-04-21 13:00:04'),('C044','2023-05-25 14:20:10');
/*!40000 ALTER TABLE `created_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll`
--

DROP TABLE IF EXISTS `enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enroll` (
  `courseID` varchar(4) NOT NULL,
  `userID` varchar(4) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`courseID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `enroll_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `enroll_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll`
--

LOCK TABLES `enroll` WRITE;
/*!40000 ALTER TABLE `enroll` DISABLE KEYS */;
INSERT INTO `enroll` VALUES ('C000','S000','2016-03-15 10:23:45'),('C000','S011','2016-01-15 09:20:30'),('C000','S021','2016-01-05 08:10:20'),('C000','S031','2016-01-15 08:00:00'),('C001','S000','2017-06-18 14:05:32'),('C001','S011','2017-02-18 10:30:45'),('C001','S021','2017-02-06 09:15:30'),('C001','S031','2017-02-16 09:05:10'),('C002','S000','2018-09-25 09:15:20'),('C002','S011','2018-03-25 11:40:55'),('C002','S021','2018-03-07 10:20:40'),('C002','S031','2018-03-17 10:10:20'),('C003','S001','2016-02-11 11:45:33'),('C003','S012','2016-04-12 12:50:15'),('C003','S022','2016-04-08 11:25:50'),('C003','S031','2017-04-18 11:15:30'),('C004','S001','2017-07-24 16:23:44'),('C004','S012','2017-05-23 13:20:35'),('C004','S022','2017-05-09 12:30:00'),('C004','S032','2016-05-19 12:20:40'),('C005','S001','2018-11-13 08:55:12'),('C005','S012','2018-06-30 14:10:50'),('C005','S022','2018-06-10 13:35:10'),('C005','S032','2017-06-20 13:25:50'),('C006','S002','2016-05-30 12:34:56'),('C006','S012','2017-07-25 15:15:05'),('C006','S022','2017-07-11 14:40:20'),('C006','S032','2018-07-21 14:30:00'),('C007','S002','2017-08-19 17:45:01'),('C007','S013','2016-08-14 16:25:20'),('C007','S023','2016-08-12 15:45:30'),('C007','S032','2017-08-22 15:35:10'),('C008','S002','2018-03-21 14:22:18'),('C008','S013','2017-09-27 17:35:40'),('C008','S023','2017-09-13 16:50:40'),('C008','S033','2016-09-23 16:40:20'),('C009','S002','2017-12-29 18:39:47'),('C009','S013','2018-10-11 18:45:55'),('C009','S023','2018-10-14 17:55:50'),('C009','S033','2017-10-24 17:45:30'),('C010','S003','2016-06-13 10:15:25'),('C010','S014','2016-11-22 19:55:15'),('C010','S024','2016-11-15 18:00:00'),('C010','S033','2018-11-25 18:50:40'),('C011','S003','2017-10-14 09:42:36'),('C011','S014','2017-12-13 20:05:30'),('C011','S024','2017-12-16 19:05:10'),('C011','S034','2016-12-26 19:55:50'),('C012','S003','2018-01-11 13:45:59'),('C012','S014','2018-01-19 21:15:45'),('C012','S024','2018-01-17 20:10:20'),('C012','S034','2017-01-27 20:00:00'),('C013','S004','2016-04-05 14:20:33'),('C013','S015','2016-02-23 22:25:55'),('C013','S025','2016-02-18 21:15:30'),('C013','S034','2018-02-28 21:05:10'),('C014','S004','2017-09-22 11:50:44'),('C014','S015','2017-03-14 23:35:10'),('C014','S025','2017-03-19 22:20:40'),('C014','S035','2016-03-01 22:10:20'),('C015','S004','2018-05-23 15:35:27'),('C015','S015','2018-04-05 08:45:25'),('C015','S025','2018-04-20 23:25:50'),('C015','S035','2017-04-02 23:15:30'),('C016','S005','2016-07-18 16:33:45'),('C016','S016','2016-05-18 09:55:35'),('C016','S026','2016-05-21 08:30:00'),('C016','S035','2018-05-03 08:20:40'),('C017','S005','2017-12-20 19:22:11'),('C017','S016','2017-06-29 10:05:50'),('C017','S026','2017-06-22 09:35:10'),('C017','S036','2016-06-04 09:25:50'),('C018','S005','2018-08-27 10:23:47'),('C018','S016','2018-07-21 11:15:05'),('C018','S026','2018-07-23 10:40:20'),('C018','S036','2017-07-05 10:30:00'),('C019','S005','2017-05-15 12:31:22'),('C019','S016','2017-08-23 12:25:15'),('C019','S026','2017-08-24 11:45:30'),('C019','S036','2018-08-06 11:35:10'),('C020','S006','2016-08-21 13:41:29'),('C020','S017','2016-09-14 13:35:30'),('C020','S027','2016-09-25 12:50:40'),('C020','S037','2016-09-07 12:40:20'),('C021','S006','2017-01-30 17:56:14'),('C021','S017','2017-10-05 14:45:40'),('C021','S027','2017-10-26 13:55:50'),('C021','S037','2017-10-08 13:45:30'),('C022','S006','2018-04-13 09:23:10'),('C022','S017','2018-11-11 15:55:55'),('C022','S027','2018-11-27 14:00:00'),('C022','S037','2018-11-09 14:50:40'),('C023','S007','2016-11-25 12:34:44'),('C023','S018','2016-12-22 16:05:10'),('C023','S028','2016-12-28 15:05:10'),('C023','S038','2016-12-10 15:55:50'),('C024','S007','2017-03-18 18:15:06'),('C024','S018','2017-01-13 17:15:25'),('C024','S028','2017-01-29 16:10:20'),('C024','S038','2017-01-11 16:00:00'),('C025','S007','2018-02-28 11:42:34'),('C025','S018','2018-02-14 18:25:35'),('C025','S028','2018-02-03 17:15:30'),('C025','S038','2018-02-12 17:05:10'),('C026','S008','2016-12-12 14:25:37'),('C026','S019','2016-03-15 19:35:50'),('C026','S029','2016-03-31 18:20:40'),('C026','S039','2016-03-13 18:10:20'),('C027','S008','2017-04-27 10:35:21'),('C027','S019','2017-04-16 20:45:05'),('C027','S029','2017-04-01 19:25:50'),('C027','S039','2017-04-14 19:15:30'),('C028','S008','2018-06-19 13:29:53'),('C028','S019','2018-05-17 21:55:15'),('C028','S029','2018-05-02 20:30:00'),('C028','S039','2018-05-15 20:20:40'),('C029','S009','2016-10-31 16:40:12'),('C029','S020','2016-06-18 22:05:30'),('C029','S030','2016-06-03 21:35:10'),('C029','S040','2016-06-16 21:25:50'),('C030','S009','2017-02-22 09:15:18'),('C030','S020','2017-07-19 23:15:40'),('C030','S030','2017-07-04 22:40:20'),('C030','S040','2017-07-17 22:30:00'),('C031','S009','2018-07-05 15:47:29'),('C031','S020','2018-08-20 08:25:55'),('C031','S030','2018-08-05 23:45:30'),('C031','S040','2018-08-18 23:35:10'),('C032','S010','2016-01-14 11:35:40'),('C032','S020','2017-09-21 09:35:10'),('C032','S030','2017-09-06 08:50:40'),('C032','S040','2017-09-19 08:40:20'),('C033','S010','2017-08-02 13:55:18'),('C034','S010','2018-10-23 14:30:25');
/*!40000 ALTER TABLE `enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning`
--

DROP TABLE IF EXISTS `learning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning` (
  `userID` varchar(4) NOT NULL,
  `lectureID` int NOT NULL,
  `time` datetime NOT NULL,
  `courseID` varchar(4) NOT NULL,
  `percent` float DEFAULT NULL,
  PRIMARY KEY (`userID`,`lectureID`,`time`,`courseID`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `learning_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `learning_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning`
--

LOCK TABLES `learning` WRITE;
/*!40000 ALTER TABLE `learning` DISABLE KEYS */;
INSERT INTO `learning` VALUES ('S000',1,'2024-07-10 08:00:00','C000',75.5),('S000',1,'2024-07-10 08:30:00','C000',75.5),('S000',1,'2024-07-10 09:20:00','C000',80),('S000',1,'2024-07-12 06:20:00','C000',45),('S000',1,'2024-08-09 11:16:00','C001',0.3),('S000',2,'2024-07-10 09:00:00','C000',80),('S000',2,'2024-07-10 10:10:00','C000',85),('S000',2,'2024-07-10 11:03:00','C000',70),('S000',2,'2024-07-12 07:04:00','C000',40),('S000',3,'2024-07-10 10:00:00','C000',85),('S000',3,'2024-07-10 12:00:10','C000',65),('S000',3,'2024-07-10 13:20:00','C000',60),('S000',4,'2024-07-10 11:00:00','C000',90),('S000',4,'2024-07-10 14:02:00','C000',50),('S000',4,'2024-07-10 15:40:40','C000',55),('S000',5,'2024-07-10 12:00:00','C000',92),('S000',5,'2024-07-10 16:20:10','C000',60),('S000',5,'2024-07-10 17:03:05','C000',65),('S000',6,'2024-07-10 18:00:00','C000',70),('S000',6,'2024-07-10 19:00:00','C000',75),('S000',7,'2024-07-10 20:00:00','C000',80),('S000',7,'2024-07-10 21:00:00','C000',85),('S000',8,'2024-07-10 22:00:00','C000',90),('S000',8,'2024-07-10 23:00:00','C000',95),('S000',9,'2024-07-11 00:00:00','C000',75),('S000',9,'2024-07-11 01:00:00','C000',80),('S000',10,'2024-07-11 02:00:00','C000',85),('S000',10,'2024-07-11 03:00:00','C000',90),('S000',11,'2024-07-10 17:00:00','C000',95),('S000',11,'2024-07-11 04:10:00','C000',95),('S000',11,'2024-07-11 05:10:00','C000',70),('S000',12,'2024-07-11 06:00:00','C000',65),('S000',12,'2024-07-11 07:00:00','C000',60),('S000',13,'2024-07-11 08:00:00','C000',55),('S000',13,'2024-07-11 09:00:00','C000',50),('S000',14,'2024-07-11 10:00:00','C000',45),('S000',14,'2024-07-11 11:00:00','C000',40),('S000',15,'2024-07-11 12:00:00','C000',35),('S000',15,'2024-07-11 13:00:00','C000',30),('S000',16,'2024-07-11 14:00:00','C000',25),('S000',16,'2024-07-11 15:00:00','C000',20),('S000',17,'2024-07-11 16:00:00','C000',15),('S000',17,'2024-07-11 17:00:00','C000',10),('S000',18,'2024-07-11 18:00:00','C000',5),('S000',18,'2024-07-11 19:00:00','C000',0),('S000',19,'2024-07-11 20:00:00','C000',95),('S000',19,'2024-07-11 21:00:00','C000',90),('S000',20,'2024-07-10 08:00:00','C001',75.5),('S000',20,'2024-07-10 09:00:00','C001',80),('S000',20,'2024-07-11 22:00:00','C000',85),('S000',20,'2024-07-11 23:00:00','C000',80),('S000',21,'2024-07-10 10:00:00','C001',85),('S000',21,'2024-07-10 11:00:00','C001',70),('S000',21,'2024-07-12 00:00:00','C000',75),('S000',21,'2024-07-12 01:00:00','C000',70),('S000',22,'2024-07-10 12:00:00','C001',65),('S000',22,'2024-07-10 13:00:00','C001',60),('S000',22,'2024-07-12 02:00:00','C000',65),('S000',22,'2024-07-12 03:00:00','C000',60),('S000',23,'2024-07-10 14:00:00','C001',50),('S000',23,'2024-07-10 15:00:00','C001',55),('S000',23,'2024-07-12 04:00:00','C000',55),('S000',23,'2024-07-12 05:00:00','C000',50),('S000',24,'2024-07-10 16:00:00','C001',60),('S000',24,'2024-07-10 17:00:00','C001',65),('S000',25,'2024-07-10 18:00:00','C001',70),('S000',25,'2024-07-10 19:00:00','C001',75),('S000',26,'2024-07-10 20:00:00','C001',80),('S000',26,'2024-07-10 21:00:00','C001',85),('S000',27,'2024-07-10 22:00:00','C001',90),('S000',27,'2024-07-10 23:00:00','C001',95),('S000',28,'2024-07-11 00:00:00','C001',75),('S000',28,'2024-07-11 01:00:00','C001',80),('S000',29,'2024-07-11 02:00:00','C001',85),('S000',29,'2024-07-11 03:00:00','C001',90),('S000',30,'2024-07-11 04:00:00','C001',95),('S000',30,'2024-07-11 05:00:00','C001',70),('S000',31,'2024-07-11 06:00:00','C001',65),('S000',31,'2024-07-11 07:00:00','C001',60),('S000',32,'2024-07-11 08:00:00','C001',55),('S000',32,'2024-07-11 09:00:00','C001',50),('S000',33,'2024-07-11 10:00:00','C001',45),('S000',33,'2024-07-11 11:00:00','C001',40),('S000',34,'2024-07-11 12:00:00','C001',35),('S000',34,'2024-07-11 13:00:00','C001',30),('S000',35,'2024-07-11 14:00:00','C001',25),('S000',35,'2024-07-11 15:00:00','C001',20),('S000',36,'2024-07-11 16:00:00','C001',15),('S000',36,'2024-07-11 17:00:00','C001',10),('S000',37,'2024-07-11 18:00:00','C001',5),('S000',37,'2024-07-11 19:00:00','C001',0),('S000',38,'2024-07-11 20:00:00','C001',95),('S000',38,'2024-07-11 21:00:00','C001',90),('S000',39,'2024-07-11 22:00:00','C001',85),('S000',39,'2024-07-11 23:00:00','C001',80),('S000',40,'2024-07-12 00:00:00','C001',75),('S000',40,'2024-07-12 01:00:00','C001',70),('S000',41,'2024-07-12 02:00:00','C001',65),('S000',41,'2024-07-12 03:00:00','C001',60),('S000',42,'2024-07-12 04:00:00','C001',55),('S000',42,'2024-07-12 05:00:00','C001',50),('S000',43,'2024-07-12 06:00:00','C001',45),('S000',43,'2024-07-12 07:00:00','C001',40);
/*!40000 ALTER TABLE `learning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify`
--

DROP TABLE IF EXISTS `notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify` (
  `notifyID` varchar(4) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `message` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `routing` varchar(200) DEFAULT NULL,
  `image_course` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`notifyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify`
--

LOCK TABLES `notify` WRITE;
/*!40000 ALTER TABLE `notify` DISABLE KEYS */;
INSERT INTO `notify` VALUES ('N000','Bạn có thông báo mới!','Bạn có một tin nhắn mới trong phần bình luận khóa học C000.','http://localhost:5173/course/details/C000','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N001','Thông báo mới từ khóa học','Bạn vừa nhận được một bình luận mới trong khóa học C001.','http://localhost:5173/course/details/C001','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N002','Tin nhắn mới đã được gửi đến','Bạn có một tin nhắn mới trong phần bình luận khóa học C000.','http://localhost:5173/course/details/C000','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N003','Cập nhật bình luận khóa học','Khóa học C001 có một bình luận mới. Hãy kiểm tra ngay!','http://localhost:5173/course/details/C001','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N004','Bạn có một thông báo!','Một tin nhắn mới đã được đăng trong phần bình luận của khóa học C000.','http://localhost:5173/course/details/C000','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N005','Thông báo từ hệ thống khóa học','Một bình luận mới đã xuất hiện trong khóa học C001.','http://localhost:5173/course/details/C001','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N006','Tin nhắn mới trong khóa học','Bạn nhận được một bình luận mới trong khóa học C000.','http://localhost:5173/course/details/C000','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N007','Cập nhật mới từ khóa học','Khóa học C001 vừa có một bình luận mới.','http://localhost:5173/course/details/C001','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N008','Thông báo quan trọng!','Một tin nhắn mới trong phần bình luận khóa học C000 vừa được gửi.','http://localhost:5173/course/details/C000','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0'),('N009','Bình luận mới đã được thêm','Một bình luận mới đã được thêm vào khóa học C001.','http://localhost:5173/course/details/C001','https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0');
/*!40000 ALTER TABLE `notify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `published_course`
--

DROP TABLE IF EXISTS `published_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `published_course` (
  `courseID` varchar(4) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`courseID`),
  CONSTRAINT `published_course_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `published_course`
--

LOCK TABLES `published_course` WRITE;
/*!40000 ALTER TABLE `published_course` DISABLE KEYS */;
INSERT INTO `published_course` VALUES ('C000','2013-01-15 10:00:00'),('C001','2013-02-20 11:00:00'),('C002','2013-03-25 12:00:00'),('C003','2013-04-30 13:00:00'),('C004','2013-05-15 14:00:00'),('C005','2013-06-20 15:00:00'),('C006','2013-07-25 16:00:00'),('C007','2013-08-30 17:00:00'),('C008','2013-09-15 18:00:00'),('C009','2013-10-20 19:00:00'),('C010','2014-01-15 10:00:00'),('C011','2014-02-20 11:00:00'),('C012','2014-03-25 12:00:00'),('C013','2014-04-30 13:00:00'),('C014','2014-05-15 14:00:00'),('C015','2014-06-20 15:00:00'),('C016','2014-07-25 16:00:00'),('C017','2014-08-30 17:00:00'),('C018','2014-09-15 18:00:00'),('C019','2014-10-20 19:00:00'),('C020','2015-01-15 10:00:00'),('C021','2015-02-20 11:00:00'),('C022','2015-03-25 12:00:00'),('C023','2015-04-30 13:00:00'),('C024','2015-05-15 14:00:00'),('C025','2015-06-20 15:00:00'),('C026','2015-07-25 16:00:00'),('C027','2015-08-30 17:00:00'),('C028','2015-09-15 18:00:00'),('C029','2015-10-20 19:00:00'),('C030','2015-11-15 20:00:00'),('C031','2015-12-20 21:00:00'),('C032','2015-12-20 21:30:00'),('C033','2015-12-20 21:40:00'),('C034','2015-12-20 21:40:01');
/*!40000 ALTER TABLE `published_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `courseID` varchar(4) NOT NULL,
  `userID` varchar(4) NOT NULL,
  `message` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `star` float DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`courseID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES ('C000','S000','Great course, learned a lot!',4.5,'2018-12-15 10:30:00'),('C000','S011','The course was very informative and well-structured.',4,'2019-01-20 14:45:00'),('C000','S021','I found some sections challenging, but overall good.',3.8,'2019-06-25 16:20:00'),('C000','S031','Excellent content and delivery, highly recommend!',5,'2020-02-10 09:15:00'),('C001','S000','The course was not as expected, too basic.',2.5,'2018-12-22 11:15:00'),('C001','S011','Content was mediocre and not very engaging.',2,'2019-03-10 13:30:00'),('C001','S021','Some useful information, but overall disappointing.',2.8,'2019-07-19 15:40:00'),('C001','S031','Lacked depth and detail, not worth the time.',1.5,'2020-01-05 10:50:00'),('C002','S000','Very comprehensive and detailed course.',4.7,'2018-12-30 09:20:00'),('C002','S011','Not what I expected, found it too difficult.',1.8,'2019-02-15 10:30:00'),('C002','S021','Good course with useful insights.',4.2,'2019-05-10 11:40:00'),('C002','S031','Poorly structured, hard to follow.',2.3,'2020-04-01 13:50:00'),('C003','S001','Excellent course, highly recommended!',4.9,'2018-12-28 08:30:00'),('C003','S012','The course content was good, but the delivery was poor.',3.2,'2019-03-20 09:45:00'),('C003','S022','Average course, nothing exceptional.',3,'2019-08-15 11:10:00'),('C003','S031','Found the course quite engaging and informative.',4.5,'2020-03-05 12:20:00'),('C004','S001','Very informative course, learned a lot!',4.8,'2018-12-25 10:40:00'),('C004','S012','Didn\'t find the course content useful.',2.7,'2019-04-10 11:50:00'),('C004','S022','Enjoyed the course and gained valuable knowledge.',4.3,'2019-09-05 13:05:00'),('C004','S032','The course was okay, but not worth the price.',3,'2020-02-20 14:15:00'),('C005','S001','One of the best courses I have taken!',4.9,'2019-01-05 10:50:00'),('C005','S012','The course material was outdated.',2.5,'2019-05-20 11:55:00'),('C005','S022','Really enjoyed the practical exercises.',4.5,'2019-10-15 13:10:00'),('C005','S032','Not satisfied with the course content.',2,'2020-03-01 14:20:00'),('C006','S002','Excellent course content and delivery.',4.7,'2019-01-10 11:00:00'),('C006','S012','The course didn\'t meet my expectations.',2.8,'2019-06-25 12:05:00'),('C006','S022','Highly informative and practical course.',4.5,'2019-11-20 13:20:00'),('C006','S032','The course was too basic for my level.',2.2,'2020-04-05 14:30:00'),('C007','S002','The course provided valuable insights.',4.5,'2019-01-15 11:10:00'),('C007','S013','Great course content, very well explained.',4.8,'2019-07-30 12:15:00'),('C007','S023','Enjoyed the interactive elements of the course.',4.3,'2019-12-25 13:30:00'),('C007','S032','Found the course too theoretical, lacking practical examples.',3.2,'2020-05-10 14:40:00'),('C008','S002','Well-organized course with clear explanations.',4.6,'2019-02-01 11:20:00'),('C008','S013','The course helped me improve my skills significantly.',4.9,'2019-08-15 12:25:00'),('C008','S023','Interesting course, enjoyed the practical exercises.',4.4,'2020-01-10 13:40:00'),('C008','S033','The course content was too basic for my level.',3,'2020-05-25 14:50:00'),('C009','S002','The course content was thorough and informative.',4.7,'2019-02-05 11:30:00'),('C009','S013','Highly recommend this course to anyone interested.',4.9,'2019-09-01 12:35:00'),('C009','S023','Good course, covered a wide range of topics.',4.5,'2020-02-05 13:50:00'),('C009','S033','Expected more practical examples in the course.',3.5,'2020-06-01 15:00:00'),('C010','S003','Found some parts of the course useful, others not so much.',3.2,'2019-02-10 11:45:00'),('C010','S014','The course had some good insights, but lacked depth.',3.8,'2019-09-05 13:00:00'),('C010','S024','Enjoyed the course overall, but wished for more practical examples.',4.2,'2020-03-10 14:15:00'),('C010','S033','Some sections were too advanced for my level, others too basic.',3.5,'2020-07-15 15:30:00'),('C011','S003','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C011','S014','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C011','S024','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C011','S034','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C012','S003','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C012','S014','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C012','S024','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C012','S034','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C013','S004','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C013','S015','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C013','S025','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C013','S034','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C014','S004','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C014','S015','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C014','S025','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C014','S035','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C015','S003','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C015','S014','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C015','S024','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C015','S034','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C016','S005','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C016','S016','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C016','S026','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C016','S035','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C017','S005','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C017','S016','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C017','S026','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C017','S036','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C018','S005','The course was well-structured and easy to follow.',4.6,'2019-03-15 12:00:00'),('C018','S016','Did not find the content relevant to my needs.',2.9,'2019-10-10 13:20:00'),('C018','S026','A very informative and engaging course.',4.8,'2020-04-20 14:35:00'),('C018','S036','Some parts of the course were too basic.',3.1,'2020-08-01 15:50:00'),('C019','S005','The course provided valuable insights.',4.5,'2019-01-15 11:10:00'),('C019','S016','Great course content, very well explained.',4.8,'2019-07-30 12:15:00'),('C019','S026','Enjoyed the interactive elements of the course.',4.3,'2019-12-25 13:30:00'),('C019','S036','Found the course too theoretical, lacking practical examples.',3.2,'2020-05-10 14:40:00'),('C020','S006','The course provided valuable insights.',4.5,'2019-01-15 11:10:00'),('C020','S017','Great course content, very well explained.',4.8,'2019-07-30 12:15:00'),('C020','S027','Enjoyed the interactive elements of the course.',4.3,'2019-12-25 13:30:00'),('C020','S037','Found the course too theoretical, lacking practical examples.',3.2,'2020-05-10 14:40:00'),('C021','S006','The course provided valuable insights.',4.5,'2019-01-15 11:10:00'),('C021','S017','Great course content, very well explained.',4.8,'2019-07-30 12:15:00'),('C021','S027','Enjoyed the interactive elements of the course.',4.3,'2019-12-25 13:30:00'),('C021','S037','Found the course too theoretical, lacking practical examples.',3.2,'2020-05-10 14:40:00'),('C022','S006','The course provided valuable insights.',4.5,'2019-01-15 11:10:00'),('C022','S017','Great course content, very well explained.',4.8,'2019-07-30 12:15:00'),('C022','S027','Enjoyed the interactive elements of the course.',4.3,'2019-12-25 13:30:00'),('C022','S037','Found the course too theoretical, lacking practical examples.',3.2,'2020-05-10 14:40:00'),('C023','S007','The course was not as expected, too basic.',2.5,'2018-12-22 11:15:00'),('C023','S018','Content was mediocre and not very engaging.',2,'2019-03-10 13:30:00'),('C023','S028','Some useful information, but overall disappointing.',2.8,'2019-07-19 15:40:00'),('C023','S038','Lacked depth and detail, not worth the time.',1.5,'2020-01-05 10:50:00'),('C024','S007','The course was not as expected, too basic.',2.5,'2018-12-22 11:15:00'),('C024','S018','Content was mediocre and not very engaging.',2,'2019-03-10 13:30:00'),('C024','S028','Some useful information, but overall disappointing.',2.8,'2019-07-19 15:40:00'),('C024','S038','Lacked depth and detail, not worth the time.',1.5,'2020-01-05 10:50:00');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive_notify`
--

DROP TABLE IF EXISTS `receive_notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receive_notify` (
  `notifyID` varchar(4) NOT NULL,
  `userID` varchar(4) NOT NULL,
  `time` datetime DEFAULT NULL,
  `isRead` tinyint DEFAULT NULL,
  PRIMARY KEY (`notifyID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `receive_notify_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `receive_notify_ibfk_2` FOREIGN KEY (`notifyID`) REFERENCES `notify` (`notifyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive_notify`
--

LOCK TABLES `receive_notify` WRITE;
/*!40000 ALTER TABLE `receive_notify` DISABLE KEYS */;
INSERT INTO `receive_notify` VALUES ('N000','I000','2024-01-05 10:00:01',1),('N000','S000','2024-01-05 10:00:01',0),('N000','S011','2024-01-05 10:00:01',1),('N000','S021','2024-01-05 10:00:01',1),('N001','I001','2024-01-05 10:01:15',0),('N001','S000','2024-01-05 10:01:15',0),('N001','S011','2024-01-05 10:01:15',0),('N001','S021','2024-01-05 10:01:15',0),('N002','I000','2024-01-05 10:02:30',1),('N002','S000','2024-01-05 10:02:30',0),('N002','S011','2024-01-05 10:02:30',1),('N002','S021','2024-01-05 10:02:30',1),('N003','I001','2024-01-05 10:03:45',0),('N003','S000','2024-01-05 10:03:45',0),('N003','S011','2024-01-05 10:03:45',0),('N003','S021','2024-01-05 10:03:45',0),('N004','I000','2024-01-05 10:05:10',1),('N004','S000','2024-01-05 10:05:10',0),('N004','S011','2024-01-05 10:05:10',1),('N004','S021','2024-01-05 10:05:10',1),('N005','I001','2024-01-05 10:06:25',0),('N005','S000','2024-01-05 10:06:25',0),('N005','S011','2024-01-05 10:06:25',0),('N005','S021','2024-01-05 10:06:25',0),('N006','I000','2024-01-05 10:07:50',1),('N006','S000','2024-01-05 10:07:50',0),('N006','S011','2024-01-05 10:07:50',1),('N006','S021','2024-01-05 10:07:50',1),('N007','I001','2024-01-05 10:09:05',0),('N007','S000','2024-01-05 10:09:05',0),('N007','S011','2024-01-05 10:09:05',0),('N007','S021','2024-01-05 10:09:05',0),('N008','I000','2024-01-05 10:10:20',1),('N008','S000','2024-01-05 10:10:20',0),('N008','S011','2024-01-05 10:10:20',1),('N008','S021','2024-01-05 10:10:20',1),('N009','I001','2024-01-05 10:11:35',0),('N009','S000','2024-01-05 10:11:35',0),('N009','S011','2024-01-05 10:11:35',0),('N009','S021','2024-01-05 10:11:35',0);
/*!40000 ALTER TABLE `receive_notify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `send_mornitor`
--

DROP TABLE IF EXISTS `send_mornitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `send_mornitor` (
  `courseID` varchar(4) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`courseID`),
  CONSTRAINT `send_mornitor_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `send_mornitor`
--

LOCK TABLES `send_mornitor` WRITE;
/*!40000 ALTER TABLE `send_mornitor` DISABLE KEYS */;
INSERT INTO `send_mornitor` VALUES ('C037','2024-10-25 19:04:40'),('C038','2024-01-12 22:30:04'),('C039','2024-02-28 10:15:00');
/*!40000 ALTER TABLE `send_mornitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminated_course`
--

DROP TABLE IF EXISTS `terminated_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terminated_course` (
  `courseID` varchar(4) NOT NULL,
  `to_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`courseID`),
  CONSTRAINT `terminated_course_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminated_course`
--

LOCK TABLES `terminated_course` WRITE;
/*!40000 ALTER TABLE `terminated_course` DISABLE KEYS */;
INSERT INTO `terminated_course` VALUES ('C035','2024-07-15 12:00:00',NULL),('C036','2024-05-25 11:00:00',NULL);
/*!40000 ALTER TABLE `terminated_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` varchar(4) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `fullname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `street` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `language` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `mail_UNIQUE` (`mail`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `account` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('A000','https://randomuser.me/api/portraits/men/7.jpg','Nguyễn Văn Ly','1981-05-12','quangtruong050123@gmail.com','2009-04-15 14:30:00','Đường Bạch Mai','Hà Nội','Việt Nam','English','Admin'),('A001','https://randomuser.me/api/portraits/women/6.jpg','Trần Thị M','1984-11-22',NULL,'2009-08-25 10:45:00','Đường Đại Cồ Việt','Hà Nội','Việt Nam','Chinese','Admin'),('I000','https://randomuser.me/api/portraits/men/1.jpg','Nguyễn Văn An','1982-05-10',NULL,'2010-01-15 12:34:56','Đường Láng','Hà Nội','Việt Nam','English','Instructor'),('I001','https://randomuser.me/api/portraits/women/1.jpg','Trần Thị B','1985-07-20','lethanhvinhtbt@gmail.com','2010-02-18 08:45:12','Đường Hoàng Diệu','Hà Nội','Việt Nam','Chinese','Instructor'),('I002','https://randomuser.me/api/portraits/men/2.jpg','Phạm Văn C','1980-03-25',NULL,'2010-03-22 10:15:33','Đường Cầu Giấy','Hà Nội','Việt Nam','Japanese','Instructor'),('I003','https://randomuser.me/api/portraits/women/2.jpg','Lê Thị D','1988-11-10',NULL,'2010-04-10 14:22:18','Đường Kim Mã','Hà Nội','Việt Nam','Korean','Instructor'),('I004','https://randomuser.me/api/portraits/men/3.jpg','Hoàng Văn E','1983-01-15',NULL,'2010-05-05 09:17:45','Đường Giải Phóng','Hà Nội','Việt Nam','French','Instructor'),('I005','https://randomuser.me/api/portraits/women/3.jpg','Vũ Thị F','1989-09-30',NULL,'2010-06-20 11:30:00','Đường Nguyễn Trãi','Hà Nội','Việt Nam','English','Instructor'),('I006','https://randomuser.me/api/portraits/men/4.jpg','Đinh Văn G','1981-04-22',NULL,'2010-07-15 16:05:12','Đường Phạm Hùng','Hà Nội','Việt Nam','Spanish','Instructor'),('I007','https://randomuser.me/api/portraits/women/4.jpg','Bùi Thị H','1986-06-18',NULL,'2010-08-30 07:40:25','Đường Trường Chinh','Hà Nội','Việt Nam','German','Instructor'),('I008','https://randomuser.me/api/portraits/men/5.jpg','Ngô Văn I','1984-12-12',NULL,'2010-09-10 13:25:37','Đường Võ Chí Công','Hà Nội','Việt Nam','Chinese','Instructor'),('I009','https://randomuser.me/api/portraits/women/5.jpg','Dương Thị J','1987-08-05',NULL,'2010-10-25 19:45:56','Đường Phạm Văn Đồng','Hà Nội','Việt Nam','English','Instructor'),('S000','https://randomuser.me/api/portraits/men/10.jpg','Nguyễn Văn N','1985-06-16','21110940@student.hcmute.edu.vn','2014-01-10 09:30:00','Đường Kim Mã','Hà Nội','Việt Nam','Vietnamese','Student'),('S001','https://randomuser.me/api/portraits/women/10.jpg','Trần Thị O','1987-03-22',NULL,'2014-02-20 11:00:00','Đường Trần Duy Hưng','Hà Nội','Việt Nam','Chinese','Student'),('S002','https://randomuser.me/api/portraits/men/11.jpg','Phạm Văn P','1984-12-10',NULL,'2014-03-15 14:45:00','Đường Láng','Hà Nội','Việt Nam','Japanese','Student'),('S003','https://randomuser.me/api/portraits/women/11.jpg','Lê Thị Q','1983-07-30',NULL,'2014-04-25 16:20:00','Đường Hoàng Quốc Việt','Hà Nội','Việt Nam','Korean','Student'),('S004','https://randomuser.me/api/portraits/men/12.jpg','Hoàng Văn R','1986-01-05',NULL,'2014-05-18 09:50:00','Đường Nguyễn Chí Thanh','Hà Nội','Việt Nam','French','Student'),('S005','https://randomuser.me/api/portraits/women/12.jpg','Vũ Thị S','1988-09-12',NULL,'2014-06-20 08:30:00','Đường Tây Sơn','Hà Nội','Việt Nam','English','Student'),('S006','https://randomuser.me/api/portraits/men/13.jpg','Đinh Văn T','1982-11-23',NULL,'2014-07-22 12:15:00','Đường Phạm Văn Đồng','Hà Nội','Việt Nam','Spanish','Student'),('S007','https://randomuser.me/api/portraits/women/13.jpg','Bùi Thị U','1989-05-17',NULL,'2014-08-30 14:00:00','Đường Trường Chinh','Hà Nội','Việt Nam','German','Student'),('S008','https://randomuser.me/api/portraits/men/14.jpg','Ngô Văn V','1981-03-27',NULL,'2014-09-10 10:20:00','Đường Xã Đàn','Hà Nội','Việt Nam','Chinese','Student'),('S009','https://randomuser.me/api/portraits/women/14.jpg','Dương Thị W','1987-10-01',NULL,'2014-10-15 15:35:00','Đường Giải Phóng','Hà Nội','Việt Nam','English','Student'),('S010','https://randomuser.me/api/portraits/men/15.jpg','Lý Văn X','1980-02-20',NULL,'2014-11-13 18:00:00','Đường Võ Chí Công','Hà Nội','Việt Nam','Japanese','Student'),('S011','https://randomuser.me/api/portraits/women/15.jpg','Phan Thị Y','1989-06-18',NULL,'2014-12-05 19:45:00','Đường Nguyễn Trãi','Hà Nội','Việt Nam','Korean','Student'),('S012','https://randomuser.me/api/portraits/men/16.jpg','Trịnh Văn Z','1982-04-15',NULL,'2014-01-22 08:30:00','Đường Phạm Hùng','Hà Nội','Việt Nam','French','Student'),('S013','https://randomuser.me/api/portraits/women/16.jpg','Nguyễn Thị AA','1983-11-25',NULL,'2014-02-17 11:15:00','Đường Nguyễn Xiển','Hà Nội','Việt Nam','English','Student'),('S014','https://randomuser.me/api/portraits/men/17.jpg','Trần Văn BB','1986-08-11',NULL,'2014-03-30 14:50:00','Đường Lê Văn Lương','Hà Nội','Việt Nam','Spanish','Student'),('S015','https://randomuser.me/api/portraits/women/17.jpg','Phạm Thị CC','1981-09-09',NULL,'2014-04-18 10:40:00','Đường Hồ Tùng Mậu','Hà Nội','Việt Nam','German','Student'),('S016','https://randomuser.me/api/portraits/men/18.jpg','Lê Văn DD','1987-12-12',NULL,'2014-05-20 15:25:00','Đường Trung Hòa','Hà Nội','Việt Nam','Chinese','Student'),('S017','https://randomuser.me/api/portraits/women/18.jpg','Hoàng Thị EE','1984-05-21',NULL,'2014-06-23 09:50:00','Đường Xuân Thủy','Hà Nội','Việt Nam','English','Student'),('S018','https://randomuser.me/api/portraits/men/19.jpg','Vũ Văn FF','1983-07-07',NULL,'2014-07-25 11:00:00','Đường Bạch Mai','Hà Nội','Việt Nam','Japanese','Student'),('S019','https://randomuser.me/api/portraits/women/19.jpg','Đinh Thị GG','1986-10-28',NULL,'2014-08-28 13:20:00','Đường Giáp Bát','Hà Nội','Việt Nam','Korean','Student'),('S020','https://randomuser.me/api/portraits/men/20.jpg','Bùi Văn HH','1981-11-11',NULL,'2014-09-20 15:10:00','Đường Tôn Thất Tùng','Hà Nội','Việt Nam','French','Student'),('S021','https://randomuser.me/api/portraits/women/20.jpg','Ngô Thị II','1989-04-29',NULL,'2014-10-15 16:25:00','Đường Trần Thái Tông','Hà Nội','Việt Nam','English','Student'),('S022','https://randomuser.me/api/portraits/men/21.jpg','Dương Văn JJ','1984-06-18',NULL,'2014-11-22 18:40:00','Đường Huỳnh Thúc Kháng','Hà Nội','Việt Nam','Spanish','Student'),('S023','https://randomuser.me/api/portraits/women/21.jpg','Lý Thị KK','1985-03-30',NULL,'2014-12-10 19:50:00','Đường Hào Nam','Hà Nội','Việt Nam','German','Student'),('S024','https://randomuser.me/api/portraits/men/22.jpg','Phan Văn LL','1987-07-19',NULL,'2015-01-20 09:10:00','Đường Chùa Bộc','Hà Nội','Việt Nam','Chinese','Student'),('S025','https://randomuser.me/api/portraits/women/22.jpg','Trịnh Thị MM','1982-05-10',NULL,'2015-02-18 11:25:00','Đường Lê Đức Thọ','Hà Nội','Việt Nam','English','Student'),('S026','https://randomuser.me/api/portraits/men/23.jpg','Nguyễn Văn NN','1980-10-15',NULL,'2015-03-25 14:05:00','Đường Hồ Tùng Mậu','Hà Nội','Việt Nam','Japanese','Student'),('S027','https://example.com/avatar1.jpg','Nguyễn Văn A','1985-07-15',NULL,'2023-01-01 12:00:00','Nguyễn Văn Cừ','Hồ Chí Minh','Việt Nam','English','Student'),('S028','https://example.com/avatar2.jpg','Trần Thị B','1983-09-20',NULL,'2023-01-01 13:15:00','Lê Lợi','Hà Nội','Việt Nam','Chinese','Student'),('S029','https://example.com/avatar3.jpg','Lê Văn C','1982-04-10',NULL,'2023-01-01 14:30:00','Trần Hưng Đạo','Đà Nẵng','Việt Nam','English','Student'),('S030','https://example.com/avatar4.jpg','Phạm Thị D','1987-11-05',NULL,'2023-01-01 15:45:00','Võ Văn Tần','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S031','https://example.com/avatar5.jpg','Hoàng Văn E','1984-02-28',NULL,'2023-01-01 16:00:00','Bà Triệu','Hà Nội','Việt Nam','English','Student'),('S032','https://example.com/avatar6.jpg','Vũ Thị F','1989-06-18',NULL,'2023-01-01 17:15:00','Nguyễn Huệ','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S033','https://example.com/avatar7.jpg','Đinh Văn G','1981-08-23',NULL,'2023-01-01 18:30:00','Trần Phú','Hải Phòng','Việt Nam','English','Student'),('S034','https://example.com/avatar8.jpg','Trần Thị H','1988-12-12',NULL,'2023-01-01 19:45:00','Lê Duẩn','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S035','https://example.com/avatar9.jpg','Lê Văn I','1986-03-25',NULL,'2023-01-01 20:00:00','Hàm Nghi','Hà Nội','Việt Nam','English','Student'),('S036','https://example.com/avatar10.jpg','Phạm Thị K','1980-10-03',NULL,'2023-01-01 21:15:00','Võ Thị Sáu','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S037','https://example.com/avatar11.jpg','Vũ Văn L','1987-05-29',NULL,'2023-01-01 22:30:00','Ngô Quyền','Hải Phòng','Việt Nam','English','Student'),('S038','https://example.com/avatar12.jpg','Nguyễn Thị M','1983-09-15',NULL,'2023-01-01 23:45:00','Quang Trung','Đà Nẵng','Việt Nam','Chinese','Student'),('S039','https://example.com/avatar13.jpg','Trần Văn N','1982-11-28',NULL,'2023-01-02 00:00:00','Bà Triệu','Hà Nội','Việt Nam','English','Student'),('S040','https://example.com/avatar14.jpg','Hoàng Thị O','1988-04-13',NULL,'2023-01-02 01:15:00','Nguyễn Huệ','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S041','https://example.com/avatar15.jpg','Vũ Văn P','1985-07-31',NULL,'2023-01-02 02:30:00','Trần Phú','Hải Phòng','Việt Nam','English','Student'),('S042','https://example.com/avatar16.jpg','Đinh Thị Q','1981-12-25',NULL,'2023-01-02 03:45:00','Lê Duẩn','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S043','https://example.com/avatar17.jpg','Lê Văn R','1986-02-08',NULL,'2023-01-02 04:00:00','Hàm Nghi','Hà Nội','Việt Nam','English','Student'),('S044','https://example.com/avatar18.jpg','Phạm Thị S','1984-09-21',NULL,'2023-01-02 05:15:00','Võ Thị Sáu','Hồ Chí Minh','Việt Nam','Chinese','Student'),('S045','https://example.com/avatar19.jpg','Vũ Văn T','1980-03-17',NULL,'2023-01-02 06:30:00','Ngô Quyền','Hải Phòng','Việt Nam','English','Student'),('S046','https://example.com/avatar20.jpg','Nguyễn Thị U','1987-10-10',NULL,'2023-01-02 07:45:00','Quang Trung','Đà Nẵng','Việt Nam','Chinese','Student'),('S047','https://example.com/avatar11.jpg','Vũ Nguyên L','1987-05-29',NULL,'2023-01-01 22:30:00','Ngô Quyền','Hải Phòng','Việt Nam','English','Student'),('S048','https://example.com/avatar12.jpg','Nguyễn Hoàng M','1983-09-15',NULL,'2023-01-01 23:45:00','Quang Trung','Đà Nẵng','Việt Nam','Chinese','Student'),('S049','https://example.com/avatar13.jpg','Trần Quyết N','1982-11-28',NULL,'2023-01-02 00:00:00','Bà Triệu','Hà Nội','Việt Nam','English','Student'),('S050','https://lh3.googleusercontent.com/a/ACg8ocLm9AUJRGW4lBghF4Y9GvTa_rkKs5OmTWqTxxKk9EamB5VB0g=s96-c','Dang Quang Truong',NULL,'21110705@student.hcmute.edu.vn','2024-08-20 23:08:14',NULL,NULL,NULL,NULL,'Student');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `avg_rating`
--

/*!50001 DROP VIEW IF EXISTS `avg_rating`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `avg_rating` AS select `rating`.`courseID` AS `courseID`,format(avg(`rating`.`star`),1) AS `star`,count(0) AS `raters` from `rating` group by `rating`.`courseID` order by `star` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-24 20:59:02
