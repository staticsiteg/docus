# == Schema Information
#
# Table name: github_events
#
#  id                     :bigint
#  action                 :string(255)
#  actor_location         :string(255)
#  actor_login            :string(255)
#  additions              :bigint
#  author_association     :string(255)
#  closed_at              :datetime
#  comments               :integer
#  creator_user_login     :string(255)
#  deletions              :bigint
#  event_day              :date
#  event_month            :date
#  event_year             :integer
#  language               :string(255)
#  number                 :integer
#  org_login              :string(255)
#  pr_changed_files       :integer
#  pr_merged              :boolean
#  pr_merged_at           :datetime
#  pr_or_issue_created_at :datetime
#  pr_or_issue_title      :string(255)
#  pr_review_comments     :integer
#  push_distinct_size     :integer
#  push_size              :integer
#  repo_name              :string(255)
#  state                  :string(255)
#  type                   :string(255)
#  created_at             :datetime
#  actor_id               :bigint
#  comment_id             :bigint
#  commit_id              :string(255)
#  creator_user_id        :bigint
#  org_id                 :bigint
#  pr_or_issue_id         :bigint
#  repo_id                :bigint
#
# Indexes
#
#  index_github_events_on_action              (action)
#  index_github_events_on_actor_id            (actor_id)
#  index_github_events_on_actor_login         (actor_login)
#  index_github_events_on_additions           (additions)
#  index_github_events_on_closed_at           (closed_at)
#  index_github_events_on_comment_id          (comment_id)
#  index_github_events_on_comments            (comments)
#  index_github_events_on_commit_id           (commit_id)
#  index_github_events_on_created_at          (created_at)
#  index_github_events_on_deletions           (deletions)
#  index_github_events_on_event_day           (event_day)
#  index_github_events_on_event_month         (event_month)
#  index_github_events_on_event_year          (event_year)
#  index_github_events_on_id                  (id)
#  index_github_events_on_language            (language)
#  index_github_events_on_org_id              (org_id)
#  index_github_events_on_org_login           (org_login)
#  index_github_events_on_pr_changed_files    (pr_changed_files)
#  index_github_events_on_pr_merged_at        (pr_merged_at)
#  index_github_events_on_pr_or_issue_id      (pr_or_issue_id)
#  index_github_events_on_pr_review_comments  (pr_review_comments)
#  index_github_events_on_repo_id             (repo_id)
#  index_github_events_on_repo_name           (repo_name)
#  index_github_events_on_type                (type)
#
class GithubEvent < ApplicationRecord
  self.inheritance_column = :xtype
  # self.table_name = 'gh'
end
