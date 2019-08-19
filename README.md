# README

# chat spaceのデータベース設計

製作するテーブルは中間含めて全部で４つ  
* usersテーブル
* groupsテーブル
* messagesテーブル
* usersテーブルとgroupsテーブルの中間テーブルであるgroups_usersテーブル



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|e_mail|string|null: false|
|password|string|null: false|
|nickname|string|null: false,index: true|

### Association
has_many :groups,through: :groups_users  
has_many :messages  
has_many :groups_users



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false

### Association
has_many :users through:groups_users  
has_many :messages



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|group|references|null:false,foreign_key: true|
|user|references|null:false,foreign_key: true|
|text|references|foreign_key: true|
|image|string||  

### Association
belongs_to :group  
belongs_to :user




## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user　　