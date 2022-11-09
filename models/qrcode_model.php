<?php
class Qrcode_Model extends Model{
    function __construct(){
        parent::__construct();
    }

    function get_detail_proof($code){
        $query = $this->db->query("SELECT id, code, code_proof, title, create_at, file, file_link, 
                                    (SELECT tbldm_quanlity_criteria.title FROM tbldm_quanlity_criteria
                                    WHERE tbldm_quanlity_criteria.id = criteria_id) AS criteria 
                                    FROM tbl_proof WHERE code_proof = '$code'");
        return $query->fetchAll();
    }
}
?>