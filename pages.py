from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants
from .models import Group
from .models import parse_config
from . import parser as parser_py

class block_page(Page):
    def is_displayed(self):
        try:
            return int(self.subsession.config.get('round'))%3 == 1
        except:
            return False
    def vars_for_template(self):
        return{
            'block_num': int(self.subsession.config.get('round')/3) +1,
            'Participation_cost': round(self.subsession.in_round(self.subsession.config.get('round')).config.get('participation_fee') +self.subsession.in_round(self.subsession.config.get('round') + 1).config.get('participation_fee') +self.subsession.in_round(self.subsession.config.get('round') + 2).config.get('participation_fee'),2),
            }
class MainPage(Page):
    timeout_seconds = 300
    form_model = 'player'
    form_fields = ['width', 'cost', 'm_low', 'm_high', 'low_val', 'high_val', 'bid_price', 'ask_price', 'bought', 'sold', 'round_payoff']

    # called 2-3 times per round
    def is_displayed(self):
        # print('is_displayed', self.subsession.config)
        # Finish -> self.subsession.config is None,
        # if self.subsession.config is None:
        #     print('finished all rounds! calling parser.py:')
        #     msg = parser_py.test()
        #     print('pages.py: ', msg)
        return self.subsession.config is not None

    def vars_for_template(self):
        return {
            'round_num': self.subsession.config.get('round'),
            'participation_fee': self.subsession.get_participation_fee(),
            'g': self.subsession.get_g(),
            'k': self.subsession.get_k(),
            'm': self.subsession.get_m(),
            'y': self.subsession.get_y(),
            'q': self.subsession.get_q(),
            'expected_value': self.subsession.get_expected_value(),
            'default': self.subsession.get_default(),
            'participation_fee': self.subsession.get_buy_option(),
            'sell_option': self.subsession.get_sell_option(),
        }

class ResultsWaitPage(WaitPage):
    pass


class Results(Page):
    def is_displayed(self):
        try:
            return (self.subsession.config.get('round'))%3 == 0
        except:
            return False

    def vars_for_template(self):
        return{
            'block_num': int(self.subsession.config.get('round')/3),
            'Participation_cost': round(self.subsession.in_round(self.subsession.config.get('round')).config.get('participation_fee') +self.subsession.in_round(self.subsession.config.get('round') - 1).config.get('participation_fee') +self.subsession.in_round(self.subsession.config.get('round') - 2).config.get('participation_fee'),2),
            'total_round_payoff': round((self.player.in_round(self.subsession.config.get('round')).round_payoff + self.player.in_round(self.subsession.config.get('round') - 1).round_payoff + self.player.in_round(self.subsession.config.get('round')-2).round_payoff),2),
            'total_payoff': round(round((self.player.in_round(self.subsession.config.get('round')).round_payoff + self.player.in_round(self.subsession.config.get('round') - 1).round_payoff + self.player.in_round(self.subsession.config.get('round')-2).round_payoff),2) - self.subsession.in_round(self.subsession.config.get('round')).config.get('participation_fee') - self.subsession.in_round(self.subsession.config.get('round')-1).config.get('participation_fee') - self.subsession.in_round(self.subsession.config.get('round')-2).config.get('participation_fee'),2),
            'round_1': round((self.player.in_round(self.subsession.config.get('round')).round_payoff), 2),
            'round_2': round((self.player.in_round(self.subsession.config.get('round') - 1).round_payoff), 2),
            'round_3': round((self.player.in_round(self.subsession.config.get('round') - 2).round_payoff), 2),

            }
class payment_page(Page):
    def is_displayed(self):
        return self.subsession.config.get('round') == 27
    def vars_for_template(self):
        payment_payoff = 0
        ##sum of total round payoffs
        participation_fee_total = 0
        ##sum of total participation fees
        for p in self.player.in_all_rounds():
            payment_payoff += p.round_payoff
        ##function to sum round payoffs
        for s in self.subsession.in_all_rounds():
            participation_fee_total += s.config.get('participation_fee')
        ##function to sum total participation fees
        return{
            'player_id': self.player.id_in_group,
            'total_payoff': (payment_payoff - participation_fee_total)*.5
        }
page_sequence = [block_page,MainPage,Results, payment_page]
