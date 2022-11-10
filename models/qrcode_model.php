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

    function get_detail_document_in($code){
        $query = $this->db->query("SELECT id, code, cate_id, number_in, date_in, number_dc, date_dc,
                                title, create_at, (SELECT tbldm_document.title FROM tbldm_document
                                WHERE tbldm_document.id = cate_id) AS category, (SELECT fullname
                                FROM tbl_personel WHERE tbl_personel.id = (SELECT hr_id FROM tbl_users
                                WHERE tbl_users.id = user_id)) AS fullname, file 
                                FROM tbl_document_in WHERE number_in = $code AND status = 0");
        return $query->fetchAll();
    }

    function get_detail_document_out($code){
        $query = $this->db->query("SELECT id, code, cate_id, number_dc, date_dc, location_to,
                                title, create_at, (SELECT tbldm_document.title FROM tbldm_document
                                WHERE tbldm_document.id = cate_id) AS category, (SELECT fullname
                                FROM tbl_personel WHERE tbl_personel.id = (SELECT hr_id FROM tbl_users
                                WHERE tbl_users.id = user_id)) AS fullname, file 
                                FROM tbl_document_out WHERE number_dc = '$code' AND status = 0");
        return $query->fetchAll();
    }

    function get_detail_book($code){
        $query = $this->db->query("SELECT id, code, title, cate_id, author, number_page, content, file, image, type,
                                (SELECT tbldm_book.title FROM tbldm_book WHERE tbldm_book.id = cate_id) AS category,
                                (SELECT tbldm_book_manu.title FROM tbldm_book_manu WHERE tbldm_book_manu.id = manu_id)
                                AS manuafatory FROM tbl_book WHERE code = '$code'");
        return $query->fetchAll();
    }

    function addObj_read($data){
        $query = $this->insert("tbl_book_read", $data);
        return $query;
    }
}
?>