defmodule Poetic.Repo.Migrations.AddUploadsHasThumb do
  use Ecto.Migration

  def change do
  	alter table(:uploads) do
		add :has_thumb, :boolean, default: false
	end
  end
end
