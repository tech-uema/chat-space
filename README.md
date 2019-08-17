# README

# chat spaceのデータベース設計

製作するテーブルは中間含めて全部で４つ  
* usersテーブル
* roomsテーブル
* messagesテーブル
* usersテーブルとroomsテーブルの中間テーブルであるgroups_usersテーブル



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|e_mail|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
has_many :groups through:groups_users  
has_many :messages  



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null:false,foreign_key: true|
|name|string|null:false
|users|integer|null:false|

### Association
has_many :users through:groups_users  
has_many :messages



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|message_id|integer|null:false,foreign_key: true|
|group|integer|null:false|
|user|integer|null:false|
|message|text|null:false|
|ceated_at|timestamp|null:false|

belongs_to :user

### Association


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user