<?php
class Result_Model extends Model{
    function __construct(){
        parent::__construct();
    }

    function getFetObj($q, $offset, $rows){
        $result = array();
        $query = $this->db->query("SELECT COUNT(*) AS Total FROM data_all_search WHERE title LIKE '%$q%'
                                    OR code LIKE '%$q%'");
        $row = $query->fetchAll();
        $query = $this->db->query("SELECT id, code, title, create_at, type FROM data_all_search WHERE title LIKE '%$q%'
                                    OR code LIKE '%$q%' ORDER BY title ASC LIMIT $offset, $rows");
        $result['total'] = $row[0]['Total'];
        $result['rows'] = $query->fetchAll();
        return $result;
    }
}
?>