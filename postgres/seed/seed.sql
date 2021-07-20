-- Seed data with a fake user for testing

insert into users (name, email, entries, joined) values ('c', 'c@gmail.com', 5, '2018-01-01');
insert into login (hash, email) values ('$2y$10$cpE1QyvSZDSa2PPunzxjjunfmNekF7smDhQ4O3KjhwCkFdCD1EK8K', 'c@gmail.com');

