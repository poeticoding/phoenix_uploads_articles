defmodule Poetic.Repo do
  use Ecto.Repo,
    otp_app: :poetic,
    adapter: Ecto.Adapters.Postgres
end
