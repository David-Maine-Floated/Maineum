

    json.array! @articles do |article|
    json.extract! article,  :title, :body, :topics, :created_at, :updated_at, :author_id, :id
    json.photoUrl article.photo.attached? ? article.photo.url : nil
    end

