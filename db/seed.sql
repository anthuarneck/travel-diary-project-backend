\c travel_diary_dev;

INSERT INTO travel_users (first_name, last_name, username, password)
VALUES
('Tone', 'River', 'TRiver', 'password');

INSERT INTO destinations (destination_name, image_url)
VALUES
('Japan', 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
('Costa Rica', 'https://images.pexels.com/photos/17302348/pexels-photo-17302348/free-photo-of-a-beach-with-palm-trees-and-sand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
('Rome', 'https://images.pexels.com/photos/161858/rome-ancient-italy-landmark-161858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

INSERT INTO memories (rating, cost, review, experiences, date, travel_user_id, destination_id)
VALUES
(5, 4700, 'Love the culture & scenery', 'Visited Mt. Fuji, Explored Tokyo & Kyoto', 'Aug 8th 2023', 1, 1),
(5, 1500, 'Gorgeous!!', 'Went surfing, trekked volcano', 'May 17th 2022', 1, 2),
(4, 3800, 'Amazing place for history buffs like me!', 'Explored the Colosseum', 'July 23rd 2023', 1, 3);
