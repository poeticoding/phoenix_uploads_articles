defmodule PoeticWeb.UploadController do
  use PoeticWeb, :controller

  alias Poetic.Documents
  alias Poetic.Documents.Upload

  def index(conn, _params) do
  	uploads = Documents.list_uploads()
  	render(conn, "index.html", uploads: uploads)
  end

  def new(conn, _params) do
    render(conn, "new.html")
  end

  def create(conn, %{"upload" => %Plug.Upload{}=upload}) do
  	case Documents.create_upload_from_plug_upload(upload) do
  		{:ok, upload}->
  			conn
        |> put_flash(:info, "file uploaded correctly")
  			|> redirect(to: Routes.upload_path(conn,:index))
  		{:error, reason}->
        conn
  			|> put_flash(:error, "error upload file: #{inspect(reason)}")
  			|> redirect(to: Routes.upload_path(conn, :new))
  	end
  end

  
  def show(conn, %{"id" => id}) do
    upload = Documents.get_upload!(id)
    local_path = Upload.local_path(upload.id, upload.filename)
    send_download conn, {:file, local_path}, filename: upload.filename
  end

  def thumbnail(conn, %{"upload_id" => id}) do
    thumb_path = Upload.thumbnail_path(id)
    conn
    |> put_resp_content_type("image/jpeg")
    |> send_file(200, thumb_path)
  end

end
