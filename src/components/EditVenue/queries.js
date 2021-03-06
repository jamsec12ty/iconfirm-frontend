import { gql } from "@apollo/client";

export const DELETE_VENUE_MUTATION = gql`
  mutation deleteVenue($_id: String) {
    deleteVenue(id: $_id) {
      _id
    }
  }
`;

export const GET_VENUE_QUERY = gql`
  query getVenue($id: String) {
    venue(id: $id) {
      name
      rosters{
        shifts{
          date
          clockOnDate
          clockOnDate
          shiftConfirmed
          employee{
            name
          }
        }
      }
    }
  }
`;

export const UPSERT_VENUE_MUTATION = gql`
  mutation upsertVenue(
    $logo: String,
    $name: String,
    $address: String,
    $phone: String,
    $email: String,
    $licenseeName: String,
    $liquorLicNo: String,
    $liquorLicStatus: Boolean,
    $masterLicNo: String,
    $masterLicExp: String,
    $masterLicStatus: Boolean,
    $membershipDate: String
  ) {
    upsertVenue(
      logo: $logo,
      name: $name,
      address: $address,
      phone: $phone,
      email: $email,
      licenseeName: $licenseeName,
      liquorLicNo: $liquorLicNo,
      liquorLicStatus: $liquorLicStatus,
      masterLicNo: $masterLicNo,
      masterLicExp: $masterLicExp,
      masterLicStatus: $masterLicStatus,
      membershipDate: $membershipDate
    ) {
      logo
      name
      address
      phone
      email
      licenseeName
      liquorLicNo
      liquorLicStatus
      masterLicNo
      masterLicExp
      masterLicStatus
      membershipDate
    }
  }
`;
