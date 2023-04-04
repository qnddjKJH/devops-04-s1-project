DROP TABLE IF EXISTS public.basket;
DROP TABLE IF EXISTS public.product;
DROP TABLE IF EXISTS public.category;
DROP TABLE IF EXISTS public.user;

CREATE TABLE public.category (
	id integer generated always as identity primary key,
	name varchar(20) unique
);

CREATE TABLE public.user (
	id integer generated always as identity primary key,
	username varchar(20) unique,
	type varchar(10)
);

CREATE TABLE public.product (
	id integer generated always as identity primary key,
	user_id integer not null,
	category_id integer not null,
	name varchar(100) not null,
	price integer not null,
	brand varchar(50),
	status varchar(10) not null,
	CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES "category"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE public.basket (
	id integer generated always as identity primary key,
	user_id integer,
	product_id integer not null,
	quantity integer not null,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES "product"(id) ON DELETE CASCADE ON UPDATE CASCADE
);