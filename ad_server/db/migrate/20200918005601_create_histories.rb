class CreateHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :histories do |t|
      t.integer :user_id
      t.string :old_presence
      t.string :new_presence

      t.timestamps
    end
  end
end
