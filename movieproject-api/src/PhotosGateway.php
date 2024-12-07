<?php

class PhotosGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll($movieId): array
    {
        $sql = "SELECT * FROM photos WHERE movieId = :movieId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":movieId",$movieId, PDO::PARAM_INT);

        $res->execute();
        $data = [];

        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }

        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO photos (movieId, userId, url, description) 
                VALUES (:movieId, :userId, :url, :description)";
        $res = $this->conn->prepare($sql);

        $res->bindValue(":userId",$data["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);
        $res->bindValue(":url",$data["url"], PDO::PARAM_STR);
        $res->bindValue(":description",$data["description"], PDO::PARAM_STR);

        $res->execute();
        return $this->conn->lastInsertId();
    }

    public function get(string $movieId)
    {
        $sql = "SELECT * FROM photos WHERE movieId = :movieId LIMIT 1";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":movieId", $movieId, PDO::PARAM_INT);
        $res->execute();
        return $res->fetch(PDO::FETCH_ASSOC);
    }

    public function update(array $current, array $new): int
    {
        $sql = "UPDATE photos 
                SET movieId = :movieId, 
                    url = :url, 
                    description = :description 
                WHERE movieId=:id";
        $res = $this->conn->prepare($sql);
    
        $res->bindValue(":movieId", $new["movieId"] ?? $current["movieId"], PDO::PARAM_INT);
        $res->bindValue(":url", $new["url"] ?? $current["url"], PDO::PARAM_STR);
        $res->bindValue(":description", $new["description"] ?? $current["description"], PDO::PARAM_STR);
        $res->bindValue(":id", $current["movieId"], PDO::PARAM_INT);  // Using the photo's id, not movieId
    
        $res->execute();
    
        return $res->rowCount();
    }

    public function delete(string $id): int  // Removed userId parameter as it's not used
    {
        $sql = "DELETE FROM photos WHERE movieId=:id";  // Changed movieId to id
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
    
        $res->execute();
    
        return $res->rowCount();
    }
}