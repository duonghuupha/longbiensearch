<?php
class Qrcode_Model extends Model{
    function __construct(){
        parent::__construct();
    }

    function get_detail_proof($code){
        $query = $this->db->query("SELECT id, code, code_proof, title, create_at, file, file_link, 
                                    (SELECT tbldm_quanlity_criteria.title FROM tbldm_quanlity_criteria
                                    WHERE tbldm_quanlity_criteria.id = criteria_id) AS criteria,
                                    (SELECT tbldm_quanlity_standard.title FROM tbldm_quanlity_standard
                                    WHERE tbldm_quanlity_standard.id = (SELECT tbldm_quanlity_criteria.standard_id
                                    FROM tbldm_quanlity_criteria WHERE tbldm_quanlity_criteria.id = criteria_id)) AS `standard`,
                                    (SELECT tbldm_quanlity.title FROM tbldm_quanlity WHERE tbldm_quanlity.id = (SELECT tbldm_quanlity_standard.quanlity_id 
                                    FROM tbldm_quanlity_standard WHERE tbldm_quanlity_standard.id = (SELECT tbldm_quanlity_criteria.standard_id
                                    FROM tbldm_quanlity_criteria WHERE tbldm_quanlity_criteria.id = criteria_id))) AS quanlity
                                    FROM tbl_proof WHERE code_proof = '$code'"); 
        return $query->fetchAll();
    }

    function get_detail_works($code){
        $query = $this->db->query("SELECT * FROM tbl_works WHERE code = $code");
        return $query->fetchAll();
    }
}
?>